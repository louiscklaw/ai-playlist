const PREAMBLE = `Imagine a hypothetical person named Louis who lives in Hong Kong.`
const POSTAMBLE = `When you are done, no need to reply me details. Reply me with yes`
const STUDIES = `Louis graduated in the City University of Hong Kong with bachelor degree in Electronic and Communication Engineering.`
const CMHK_WORK_EXP = `Louis had worked in China Mobile Hong Kong with position Engineer.`
const SWIR_WORK_EXP = `Louis had worked in Sierrawireless with position Validation engineer and Senior Validation Engineer`

const TEST_IMAGINE_LOUIS = (append = '') => `
${PREAMBLE}
${append}
${POSTAMBLE}
`.trim().replace(/\n/g, '');

const TEST_STUDENT_LOUIS = (append = '') =>
  TEST_IMAGINE_LOUIS([STUDIES, append].join(' '))
    .trim().replace(/\n/g, '');

const TEST_CMHK_LOUIS = (append = '') =>
  TEST_STUDENT_LOUIS([CMHK_WORK_EXP, append].join(' '))
    .trim().replace(/\n/g, '');

const TEST_SWIR_LOUIS = (append = '') =>
  TEST_STUDENT_LOUIS([CMHK_WORK_EXP, SWIR_WORK_EXP, append].join(''))
    .trim().replace(/\n/g, '');

module.exports = { TEST_IMAGINE_LOUIS, TEST_STUDENT_LOUIS, TEST_CMHK_LOUIS, TEST_SWIR_LOUIS }
