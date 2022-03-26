import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

function sluggify (text) {
  return text.toLowerCase().trim().replace(/(&amp;| & )/g, '-and-').replace(/&(.+?);/g, '').replace(/[\s\W-]+/g, '-')
}

function checkAddLineEnd (s, l) {
  if (s.length) {
    s += '\n'
  }
  s += l
  return s
}

function getRegexStart () {
  return '::: {'
}

function getRegexEnd () {
  return '} :::'
}

function getRegex (r, f) {
  return new RegExp(getRegexStart() + r + getRegexEnd(), f)
}

function processCodes (code, options) {
  let codeClean = ''
  let codePen = ''
  let hideCode = false
  let hideStart = 0
  const editorName = ''
  let lineNr = 0
  const lines = code.split('\n')
  for (const i in lines) {
    if (lines[i].indexOf(getRegexStart()) >= 0 && lines[i].indexOf(getRegexEnd()) >= 0) {
      const lin = lines[i].match(getRegex('(.*?)', 'i'))
      if (lin && lin.length > 1) {
        if (lin[1].indexOf('codepen: \'link\'') >= 0) {
          options.showCodepenIcon = true
        }

        if (lin[1].indexOf('hide: \'start\'') >= 0) {
          hideCode = true
          hideStart = lineNr
        }

        if (lin[1].indexOf('hide: \'end\'') >= 0) {
          hideCode = false
          options.hides.push({ start: hideStart, end: lineNr - 1 })
        }
      }
    } else {
      codePen = checkAddLineEnd(codePen, lines[i])
      if (!hideCode) {
        codeClean = checkAddLineEnd(codeClean, lines[i])
      }
      lineNr++
    }
  }

  return { codeClean, codePen, editorName, options }
}

function rendererCode (code, lang, escaped) {
  const { codePen, options } = processCodes(code, {
    showCodepenIcon: false,
    tabs: [
      { tp: 'code', title: 'Code' }
    ],
    hides: []
  })

  const highlighted = hljs.highlightAuto(codePen).value
  const data = codePen
    .replace(/"/g, '')
    .replace(/'/g, '')

  if (options.showCodepenIcon) {
    return `<div class="interactive-module-wrapper">
            <div class="editor">
              <span class="options">
                <form title="Edit on Codepen" action="https://codepen.io/pen/define" method="POST" target="_blank">
                  <input type="hidden" name="data" value='{"title": "New Pen!", "html": "${ data }"}'>
                  <button class="zmdi zmdi-codepen" type="submit" style="border: 0; background: none;"></button>
                </form>
              </span>
              <code contentEditable="true" class="hljs contentEditor">${ highlighted }</code>
            </div>
            <iframe class="preview" qqqscrolling="no" frameborder="0"></iframe>
          </div>`
  } else {
    return `<span><a title="Copy to Clipboard" class="zmdi zmdi-copy cp"></a>
    <pre><code class="hljs ${ lang }">${ highlighted }</code></pre><span>`
  }
}

function processBlocks (markdown) {
  const blocks = {}
  const lines = markdown.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const lin = lines[i].match(getRegex('(.*?)', 'i'))
    if (lin && lin.length > 1) {
      let matches = decodeURIComponent(lin[1]).match(new RegExp('.*startblock: \'(.*)\'.*', 'm'))
      if (matches && matches.length > 1) {
        blocks[matches[1]] = { active: true, content: [] }
        lines.splice(i--, 1)
      }
      matches = decodeURIComponent(lin[1]).match(new RegExp('.*endblock: \'(.*)\'.*', 'm'))
      if (matches && matches.length > 1) {
        try {
          blocks[matches[1]].active = false
        } catch (e) {
          console && console.error(`!!! Error parsing block: ${ matches[1] }!!!`, e)
        }
        lines.splice(i--, 1)
      }
      matches = decodeURIComponent(lin[1]).match(new RegExp('.*insertblock: \'(.*)\'.*', 'm'))
      if (matches && matches.length > 1) {
        lines.splice(i--, 1, ...blocks[matches[1]].content)
      }
    } else {
      for (const blk in blocks) {
        if (blocks[blk].active) {
          blocks[blk].content.push(lines[i])
        }
      }
    }
  }
  markdown = lines.join('\n')

  return markdown
}

function getSteps (markdown, renderer) {
  // let steps = [{name: '_default_', content: '', nextCompare: '', nextconditionsmet: 0}]
  const steps = [{ name: '', content: '', nextCompare: '', nextconditionsmet: 0 }]
  let inCompare = false
  const lines = markdown.split('\n')
  for (const i in lines) {
    let useLine = true
    const lin = lines[i].match(getRegex('(.*?)', 'i'))
    if (lin && lin.length > 1) {
      const matches = decodeURIComponent(lines[i]).match(new RegExp('step: \'(.*)\'', 'm'))
      if (matches && matches.length > 1) {
        steps.push({ name: matches[1], content: '', nextCompare: '', nextconditionsmet: 0 })
        useLine = false
      }
      if (lin[1].indexOf('nextstepcompare: \'start\'') >= 0) {
        inCompare = true
        useLine = false
      }
      if (lin[1].indexOf('nextstepcompare: \'end\'') >= 0) {
        inCompare = false
        useLine = false
      }
      if (lin[1].indexOf('nextstepcompare: \'none\'') >= 0) {
        steps[steps.length - 1].nextCompare = '_NONE_'
        useLine = false
      }
    }

    if (useLine) {
      if (inCompare) {
        if (lines[i].indexOf('```') !== 0) {
          steps[steps.length - 1].nextCompare = checkAddLineEnd(steps[steps.length - 1].nextCompare, lines[i])
        }
      } else {
        steps[steps.length - 1].content = checkAddLineEnd(steps[steps.length - 1].content, lines[i])
      }
    }
  }

  for (const i in steps) {
    marked(steps[i].content, { renderer }, (e, content) => {
      steps[i].content = content
    })
  }

  return steps
}

function parse (markdown) {
  hljs.configure({
    languages: [
      'Markdown',
      'html',
      'CSS',
      'JavaScript',
      'JSON',
      'Bash'
    ]
  })

  const renderer = new marked.Renderer()

  marked.setOptions({ renderer })

  renderer.heading = (text, level) => `<h${ level } id="${ sluggify(text) }" class="uk-h${ level > 1 ? level + 1 : level } tm-heading-fragment">${ text } <a href="#${ sluggify(text) }">#</a></h${ level }>`
  renderer.code = (code, lang, escaped) => rendererCode(code, lang, escaped)

  markdown = processBlocks(markdown)

  return getSteps(markdown, renderer)
}

export default parse
