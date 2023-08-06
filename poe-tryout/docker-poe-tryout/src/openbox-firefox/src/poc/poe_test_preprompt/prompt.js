const PREAMBLE = `Imagine a hypothetical person named Louis who lives in Hong Kong.`;
const END_WITH_YES = `When you are done, no need to reply me details. Reply me with "YES" only.`;

const STUDIES = `Louis graduated in the City University of Hong Kong with bachelor degree in Electronic and Communication Engineering.`;
const CMHK_WORK_EXP = `Louis had worked in China Mobile Hong Kong with position Engineer.`;
const SWIR_WORK_EXP = `Louis had worked in Sierrawireless with position Validation engineer and Senior Validation Engineer.`;
const TECH_STACK = `Louis like javascript programming, python programming, machine learning.`;
const HOBBIES_1 = `Louis do programming, electronic project (hardware/software) when he is free.`;
const HOBBIES_2 = `Louis love take photograph, go out for a walk when free.`;

const TEST_IMAGINE_LOUIS = (append = '') =>
  `
${PREAMBLE}
${append}
${END_WITH_YES}
`
    .trim()
    .replace(/\n/g, '');

const TEST_STUDENT_LOUIS = (append = '') => TEST_IMAGINE_LOUIS([STUDIES, append].join(' ')).trim().replace(/\n/g, '');

const TEST_CMHK_LOUIS = (append = '') =>
  TEST_STUDENT_LOUIS([CMHK_WORK_EXP, append].join(' ')).trim().replace(/\n/g, '');

const TEST_SWIR_LOUIS = (append = '') =>
  TEST_STUDENT_LOUIS([CMHK_WORK_EXP, SWIR_WORK_EXP, append].join('')).trim().replace(/\n/g, '');

const TEST_LOUIS_STACK = (append = '') =>
  TEST_SWIR_LOUIS([TECH_STACK, HOBBIES_1, HOBBIES_2, append].join('')).trim().replace(/\n/g, '');

module.exports = {
  TEST_IMAGINE_LOUIS,
  TEST_STUDENT_LOUIS,
  TEST_CMHK_LOUIS,
  TEST_SWIR_LOUIS,
  TEST_LOUIS_STACK,
};
