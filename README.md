# Resume Creator

No more need to mess around with margins or screwed up spacing in your resume. 
Clone the repo,enter your details in the raw.json file and run the convert.bat (Windows) or convert.sh (Bash - Should work on Linux and Mac both) scripts. 

A crisp, professional PDF of your resume will be generated. 

## Convert

<img src="./imgs/json.png" alt="json" width=50% />

## To

<img src="./imgs/resume.png" alt="pdf" width=50% />

The PDF file shown above is [here](./resume.pdf)


## Pre-requisites

You need to have a few softwares pre-installed on your system for this to work. 

1. [Node.js](https://nodejs.org/en/download/)
2. [Pandoc](https://pandoc.org/installing.html)

    Pandoc can be installed via command line as well. Windows 10/11 users can simply run

    ```winget install pandoc```

3. [LaTeX (via MiKTeX)](https://miktex.org/download)

    Windows 10/11 users can run 

    ```winget install miktex```

Make sure all of these are added to your system PATH as well. 

## raw.json file format

The file should be easy to understand once you have a look at it. 

Here are all the elements we support.

- name 
- title
- location
- email
- phone
- links 
    These can be to GitHub, Behance, Linkedin,etc. You can add as many as you think will fit on the page. Each link should contain 2 things:

  - name - The text to display
  - url - The url that should open when the text is clicked.
- education

  Each education should contain:
  - name (The degree, or qualification)
  - institute 
  - year (This can be a single year or a range)
  - score (Can be GPA, Percentage. Mention the unit as well)
- workexp

    This should contain the companies you have worked at. Projects are at a later section. Each workexp should contain
  - company
  - location
  - role
  - start (date)
  - end (date)
  - points (what you did there)
  - techstack (optional)
- projects
  
  A list of personal projects. Contains all the same stuff as workexp, with the addition of
  - links - links to your project, in the same format as described above (name+url). 

  Role should not be mentioned in projects.

- achievements

     A simple list of string with your achievements and awards
- skills

  Your technical skills. Divided into 3 groups. How to divide your skills is upto you. A good division of technologies is \[Languages, Frameworks, Databases+Softwares\]
- pors

  Positions of Responsibility held by you.
  Contains everything in workexp, with the addition of links, same as described above. Role is also to be mentioned.    


Improvements, Suggestions and PRs are welcome. 

I'm also working to make a website version of this, please [reach out to me](mailto:satvik.sli@gmail.com) if you are interested in working on that. 
