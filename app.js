// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts

  if (filter === 'passed') {
    return attempts.filter((attempt) => attempt.passed === true)
  }

  if (filter === 'failed') {
    return attempts.filter((attempt) => attempt.passed === false)
  }

  return attempts
}

function renderAttempts(attempts) {
  const resultList = document.querySelector('#result-list')
  const resultCount = document.querySelector('#result-count')
  let attemptsMarkup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    attemptsMarkup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })

  resultList.innerHTML = attemptsMarkup
  resultCount.innerHTML = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}

function startFilter() {
  // TODO: найдите форму, select, счётчик и список через querySelector().
  // TODO: подпишитесь на submit через addEventListener().
  // В обработчике вызовите preventDefault(), прочитайте value,
  // выберите попытки и замените innerHTML счётчика и списка.
}

startFilter()
