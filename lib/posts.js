import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  let contentHtml = processedContent.toString()

  // parse markdown tables with own code
  contentHtml = parseTables(contentHtml);
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

const parseTables = (content) => {
  let text = content.split('\n');
  let isTable = false;
  let isFirstRow = true;
  for (let i = 1; i < text.length; i++){
    if (isTable){
      let isLast = isLastRow(text[i]);
      if (isFirstRow){
        text[i] =  `<tbody>${parseRow(text[i])}`;
        isFirstRow = false;
      } else {
        text[i] =  parseRow(text[i]);
      }
      if(isLast){
        isTable = false;
        isFirstRow = true;
        text[i] += `</tbody></table>`
      }
    }
    if (isHeader(text[i - 1]) && isHeaderBreak(text[i])){
      text[i] = parseHeader(text[i - 1]);
      text[i - 1] = `<table style="border-collapse: collapse">`
      isTable = true;
    }
  }
  return text.join('\n');
}

const isLastRow = (row) => {
  return /<\/p>$/.test(row);
}

const parseHeader = (row) => {
  row = row.replace(/^<p>\|(.*)\|$/gi, "$1");
  let fields = row.split('\|');
  let header = ``;
  for (let i = 0; i < fields.length; i++){
    header += `<th style="padding: 4px 10px 4px 10px">${fields[i].trim()}</th>`;
  }
  return `<thead><tr style="border-bottom: 1px solid black">${header}</tr></thead>`
}

const parseRow = (row) => {
  row = row.replace(/^\|(.*)\|(<\/p>)?$/gi, "$1");
  let fields = row.split('\|');
  let bodyRow = ``;
  for (let i = 0; i < fields.length; i++){
    bodyRow += `<td style="padding: 4px 10px 4px 10px">${fields[i].trim()}</td>`;
  }
  return `<tr style="border-bottom: 1px solid lightgrey">${bodyRow}</tr>`
}

// is it | ------- | ---------------- |  ?
const isHeaderBreak = (row) => {
  return /^\s*\|(\s*\-{4,}\s*\|)+\s*$/.test(row);
}

// is it | Hello | Hi Ho |  ?
const isHeader = (row) => {
  return /^\s*(<p>)?\s*\|(\s*.*\s*\|)+\s*$/.test(row);
}

// <tr><td></td>...</tr>
const makeRow = (rawRow) => {
  const data =  rawRow.reduce((acc, e )=> `${acc}<td>${e.trim()}</td>`, '')
  let row = `<tr>${data}</tr>\n`
  return row;
}