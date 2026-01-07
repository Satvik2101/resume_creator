node ./scripts/create.js
pandoc -H ./scripts/personal.tex resume.md -o resume.pdf --pdf-engine=xelatex --highlight-style tango -V block-headings