'use strict';

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
  optArticleAuthorSelector = '.post-author'

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
  const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

function generateTags(){
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
        console.log(tag);

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      console.log('tagprint');

      /* add generated code to html variable */
      html += tagHTML
      console.log(tag);

    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  /* END LOOP: for every article: */
}
}
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
    clickedElement.classList.add('active');
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

function generateAuthors(){
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
      const authorHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      console.log('Print author');

      /* add generated code to html variable */
      html = html + authorHTML
      console.log(author);

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = authorHTML;
  /* END LOOP: for every article: */
}
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

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Extracted author:', author);

  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for(let authorLink of authorLinks){

     /* remove class active */
    authorLink.classList.remove('active');

  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchingLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let matchingLink of matchingLinks){

    /* add class active */
    clickedElement.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
}
}
addClickListenersToAuthors();
