const ReportTemplate = email_content => {
  return (
    `
# Report:

## Email:

{{email_content}}


## Background:

{{job_background}}

`
      .replace('{{email_content}}', email_content || '')
      .trim() + '\n'
  );
};

module.exports = { ReportTemplate };
