export function getExperience(startDateStr) {
  const startDate = new Date(startDateStr);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearPart = `${years} year${years !== 1 ? 's' : ''}`;
  const monthPart = months > 0 ? `, ${months} month${months !== 1 ? 's' : ''}` : '';

  return `${yearPart}${monthPart}`;
}

export function getYearsOfExperience(startDateStr) {
  const startDate = new Date(startDateStr);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
  }

  return years;
}

