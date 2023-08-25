class ExtractPrompts {
  constructor(companyName, jobTitle, jobAddress, postDate, jobHighlight, jobDescriptionMd) {
    this.companyName = companyName;
    this.jobTitle = jobTitle;
    this.jobAddress = jobAddress;
    this.postDate = postDate;
    this.jobHighlight = jobHighlight;
    this.jobDescriptionMd = jobDescriptionMd;
  }

  getSampleQuestions() {
    return [
      `
I will pass you a job advertisement, 
please try to summarize it in around 200 words.
`.trim(),
      `
company name: ${this.companyName || ' - '}
job title: ${this.jobTitle || ' - '}
job addess: ${this.jobAddress || ' - '}
post date: ${this.postDate || ' - '}
job highlight: ${this.jobHighlight || ' - '}

job description (markdown):
\`\`\`
${this.jobDescriptionMd}
\`\`\`
`.trim(),
    ];
  }

  getSamplePreprompts() {
    return ['Forget everything and start a new talk.'];
  }
}

module.exports = ExtractPrompts;
