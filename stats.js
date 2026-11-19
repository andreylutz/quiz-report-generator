const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  if (typeof data !== 'object' || data === null || isArray(data)) {
    return false
  }

  if (typeof data.quizTitle !== 'string' || data.quizTitle.trim() === '') {
    return false
  }

  if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0) {
    return false
  }

  if (!isArray(data.attempts) || data.attempts.length === 0) {
    return false
  }

  return data.attempts.every((attempt) => {
    if (typeof attempt !== 'object' || attempt === null || isArray(attempt)) {
      return false
    }

    return (
      typeof attempt.name === 'string' &&
      attempt.name.trim() !== '' &&
      isArray(attempt.answers) &&
      attempt.answers.length === data.correctAnswers.length
    )
  })
}

export function calculateAttempt(attempt, correctAnswers) {
  let score = 0

  correctAnswers.forEach((correctAnswer, index) => {
    if (attempt.answers[index] === correctAnswer) {
      score += 1
    }
  })

  const percentage = Math.round((score / correctAnswers.length) * 100)

  return {
    name: attempt.name.trim(),
    score,
    percentage,
    passed: percentage >= PASSING_PERCENTAGE,
  }
}

export function calculateReport(data) {
  const questionCount = data.correctAnswers.length
  const attempts = data.attempts.map((attempt) => calculateAttempt(attempt, data.correctAnswers))
  const participantCount = attempts.length
  let totalPercentage = 0
  let passedCount = 0
  let best = attempts[0]

  attempts.forEach((attempt) => {
    totalPercentage += attempt.percentage

    if (attempt.passed) {
      passedCount += 1
    }

    if (attempt.score > best.score) {
      best = attempt
    }
  })

  return {
    quizTitle: data.quizTitle.trim(),
    questionCount,
    participantCount,
    averagePercentage: Math.round(totalPercentage / participantCount),
    passedCount,
    threshold: PASSING_PERCENTAGE,
    best,
    attempts,
  }
}
