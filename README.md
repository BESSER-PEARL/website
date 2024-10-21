Freelancer Jekyll theme  
=========================

Jekyll theme based on [Freelancer bootstrap theme ](https://startbootstrap.com/theme/freelancer)

## How to update home page
- Make changes in _config.yml and _includes/about.html

## How to deploy locally

Ruby and Jekyll Installation guide: https://jekyllrb.com/docs/

Clone this repo and run:

```shell
bundle exec jekyll serve
```

The webpage is accessible from http://localhost:4000

## How to add scientific publications

- Add a new row in `_data/publications.csv`. The order is not relevant since they are ordered by year and then by typer of publication.
- Mandatory fields: `year`, `authors`, `name`, `type`, `info` 
  - `type` must be one of the following: `conference`, `journal` or `workshop`.
  - `info` is used to add details about the publication journal, conference or workshop
- Optional fields: `link` (it creates a hyperlink on the publication name, if you have a DOI link, put it here)

## How to add new members
 - Place a image in `/img/portfolio/`
 - create new markdown file with the following text
```txt
---
layout: default
modal-id: 8
date: date 
img: path to image of new team member
name: name of new team member
alt: anything 
linkedin: link to linkedin of new team member
gscholar: link to google scholar of new team member
github: link to github of new team member
description: description of new team member

---
```

