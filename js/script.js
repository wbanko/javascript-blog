'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}
function titleClickHandler(/*event*/){
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
const articleSelector = clickedElement.getAttribute('href');
console.log('Link was clicked!');

 /* [DONE] find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector(articleSelector);

console.log(articleSelector);
  /* [DONE] add class 'active' to the correct article */
 console.log('Link shown:', targetArticle);

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector= '.authors.list',
  optCloudClassCountAuthor = '4',
  optCloudClassPrefixAuthor = 'author-size-';

  function generateTitleLinks(customSelector = ''){

/* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

/* for each article */
 const articles = document.querySelectorAll(optArticleSelector + customSelector);
console.log("customSelector:", customSelector);
console.log("Full selector:", optArticleSelector + customSelector);

 let html = '';

 for(let article of articles) {

  /* get the article id */

  const articleId = article.getAttribute('id');

  /* find the title element */
  /* get the title from the title element */
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;

  /* create HTML of the link */
  const linkHTMLData = {id: articleId, title: articleTitle};
  const linkHTML = templates.articleLink(linkHTMLData);
  console.log('Printed title');
  /* insert link into titleList */

  html = html + linkHTML

  console.log(html);
 }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}
generateTitleLinks();

generateTags();


  function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked element:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Href of clicked element:', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Extracted tag:', tag);

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){

     /* remove class active */
    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let matchingLink of matchingLinks){

    /* add class active */
    matchingLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let link of allLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}
addClickListenersToTags();

function calculateAuthorsParams(allAuthors){
  const params ={
    max: 0,
    min: 99999};

  for(let author in allAuthors){
    console.log(author + 'is used' + allAuthors[author] + 'times');
    params.max = Math.max(allAuthors[author], params.max);
    params.min = Math.min(allAuthors[author], params.min);
  }
  return params;
}
function calculateAuthorsClass(count, params){
 const normalizedCount = count - params.min;

 const normalizedMax = params.max - params.min;

 const precentage = normalizedCount / normalizedMax;

 const classNumber = Math.floor( precentage * (optCloudClassCountAuthor - 1) + 1);

 return optCloudClassPrefixAuthor + classNumber;
}

function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
    for(let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);

      /* generate HTML of the link */
      //const authorHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      const authorHTMLData = {author: author};
      const authorHTML = templates.articleAuthorLink(authorHTMLData);
      console.log('Print author');

      /* add generated code to html variable */
      html = html + authorHTML
      console.log(author);

      /* [NEW] check if this link is NOT already in allAuthors */
      if (!Object.prototype.hasOwnProperty.call(allAuthors, author)) {

       // [NEW] add author to allAuthors object
      allAuthors[author] = 1;
      } else {
      allAuthors[author]++;
      }
    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = authorHTML;
  /* END LOOP: for every article: */
    }
   /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

/*[NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorsParams (allAuthors);
  console.log('authorsParams:', authorsParams);
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
      /*[NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = '<li><a class="' + calculateAuthorsClass(allAuthors[author], authorsParams) + '" href="#author-' + author + '">' + author + ' </a></li>';
      allAuthorsHTML += authorLinkHTML
}
  /*[NEW] add html form allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Clicked element:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Href of clicked element:', href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Extracted author:', author);

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for(let authorLink of authorLinks){

     /* remove class active */
    authorLink.classList.remove('active');

  /* END LOOP: for each active author link */
}
  /* find all author links with "href" attribute equal to the "href" constant */
  const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for(let matchingLink of matchingLinks){

    /* add class active */
    matchingLink.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for(let link of links){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
}
}
addClickListenersToAuthors();

function calculateTagsParams(allTags){
  const params ={
    max: 0,
    min: 99999};

  for(let tag in allTags){
    console.log(tag + 'is used' + allTags[tag] + 'times');
    params.max = Math.max(allTags[tag], params.max);
    params.min = Math.min(allTags[tag], params.min);
  }
  return params;
}
function calculateTagClass(count, params){
 const normalizedCount = count - params.min;

 const normalizedMax = params.max - params.min;

 const precentage = normalizedCount / normalizedMax;

 const classNumber = Math.floor( precentage * ( optCloudClassCount -1) + 1);

 return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
    for(let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

      /* generate HTML of the link */
        //const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
        const tagHTMLData = {tag: tag};
        const tagHTML = templates.articleTagLink(tagHTMLData);

      /* add generated code to html variable */
        html = html + tagHTML

      /* [NEW] check if this link is NOT already in allTags */
      // if(!allTags.hasOwnProperty(tag)){

      //   /*[NEW] add tag to allTags object */
      //   allTags[tag] = 1;
      // } else {
      //   allTags[tag]++;
      // }
      if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
       // [NEW] add tag to allTags object
      allTags[tag] = 1;
      } else {
      allTags[tag]++;
}

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    console.log(allTags);
  /* END LOOP: for every article: */
    }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /*[NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams (allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
      /*[NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' </a></li>';
      allTagsHTML += tagLinkHTML
}
  /*[NEW] END LOOP: for each tag in allTags:*/

  /*[NEW] add html form allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
