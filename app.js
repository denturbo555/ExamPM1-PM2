// Application State
const state = {
  subject: 'pm1', // 'pm1' or 'pm2'
  mode: 'practice', // 'practice' or 'exam'
  questions: [],
  currentIndex: 0,
  timerSeconds: 0,
  timerInterval: null,
  startTime: null,
  endTime: null,
  lastErrors: []
};

// DOM Elements
const elements = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  searchBtn: document.getElementById('searchBtn'),
  openSearchFromHomeBtn: document.getElementById('openSearchFromHomeBtn'),
  searchModal: document.getElementById('searchModal'),
  closeSearchBtn: document.getElementById('closeSearchBtn'),
  searchInput: document.getElementById('searchInput'),
  searchResultsList: document.getElementById('searchResultsList'),
  headerLogo: document.getElementById('headerLogo'),
  headerTitle: document.getElementById('headerTitle'),

  // Screens
  startScreen: document.getElementById('startScreen'),
  quizScreen: document.getElementById('quizScreen'),
  resultsScreen: document.getElementById('resultsScreen'),

  // Subject Selector & Hero
  subjectBtnPm1: document.getElementById('subjectBtnPm1'),
  subjectBtnPm2: document.getElementById('subjectBtnPm2'),
  badgeText: document.getElementById('badgeText'),
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),

  // Start Screen Controls
  modeCardPractice: document.getElementById('modeCardPractice'),
  modeCardExam: document.getElementById('modeCardExam'),
  questionCountSelect: document.getElementById('questionCountSelect'),
  countDropdownWrapper: document.getElementById('countDropdownWrapper'),
  countDropdownTrigger: document.getElementById('countDropdownTrigger'),
  selectedCountLabel: document.getElementById('selectedCountLabel'),
  countDropdownMenu: document.getElementById('countDropdownMenu'),
  optAllText: document.getElementById('optAllText'),
  shuffleQuestionsCheck: document.getElementById('shuffleQuestionsCheck'),
  shuffleOptionsCheck: document.getElementById('shuffleOptionsCheck'),
  startBtn: document.getElementById('startBtn'),

  // Quiz Screen Controls
  quizModeBadge: document.getElementById('quizModeBadge'),
  questionCounter: document.getElementById('questionCounter'),
  quizTimer: document.getElementById('quizTimer'),
  progressBar: document.getElementById('progressBar'),
  questionCategory: document.getElementById('questionCategory'),
  questionText: document.getElementById('questionText'),
  optionsContainer: document.getElementById('optionsContainer'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  exitQuizBtn: document.getElementById('exitQuizBtn'),
  questionNavGrid: document.getElementById('questionNavGrid'),
  answeredStats: document.getElementById('answeredStats'),

  // Results Screen Controls
  resPercent: document.getElementById('resPercent'),
  resFraction: document.getElementById('resFraction'),
  gradeBadge: document.getElementById('gradeBadge'),
  gradeMessage: document.getElementById('gradeMessage'),
  statCorrect: document.getElementById('statCorrect'),
  statWrong: document.getElementById('statWrong'),
  statSkipped: document.getElementById('statSkipped'),
  statTime: document.getElementById('statTime'),
  retryAllBtn: document.getElementById('retryAllBtn'),
  retryErrorsBtn: document.getElementById('retryErrorsBtn'),
  resultsHomeBtn: document.getElementById('resultsHomeBtn'),
  reviewContainer: document.getElementById('reviewContainer'),
  filterButtons: document.querySelectorAll('.filter-btn'),

  // Confirm Modal Controls
  confirmModal: document.getElementById('confirmModal'),
  confirmIcon: document.getElementById('confirmIcon'),
  confirmTitle: document.getElementById('confirmTitle'),
  confirmText: document.getElementById('confirmText'),
  confirmCancelBtn: document.getElementById('confirmCancelBtn'),
  confirmOkBtn: document.getElementById('confirmOkBtn')
};

// --- SVG Icon Templates ---
const SVG_ICONS = {
  check: '<svg class="svg-inline check-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  cross: '<svg class="svg-inline cross-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 5px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  warning: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  home: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  finish: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
  time: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  sun: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
  bulbBadge: '<svg class="mode-badge-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"></path></svg>',
  timerBadge: '<svg class="mode-badge-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>'
};

// --- Custom Confirmation Modal ---
let confirmCallback = null;

function showConfirm(title, text, onConfirm, iconType = 'warning') {
  elements.confirmTitle.textContent = title;
  elements.confirmText.textContent = text;
  elements.confirmIcon.innerHTML = SVG_ICONS[iconType] || SVG_ICONS.warning;
  confirmCallback = onConfirm;
  elements.confirmModal.classList.add('open');
}

function closeConfirm() {
  elements.confirmModal.classList.remove('open');
  confirmCallback = null;
}

// --- Theme Management (System Theme Aware) ---
function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const savedTheme = localStorage.getItem('exam_quiz_theme');
  const activeTheme = savedTheme ? savedTheme : getSystemTheme();
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateThemeIcon(activeTheme);

  // Listen to system theme changes in real time if no manual override
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('exam_quiz_theme')) {
        const sysTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', sysTheme);
        updateThemeIcon(sysTheme);
      }
    });
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getSystemTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('exam_quiz_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    elements.themeToggleBtn.innerHTML = SVG_ICONS.sun;
  } else {
    elements.themeToggleBtn.innerHTML = '<span class="theme-icon-orb"></span>';
  }
}

// --- Screen Switching ---
function showScreen(screen) {
  [elements.startScreen, elements.quizScreen, elements.resultsScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Subject Switching ---
function getCurrentSubjectQuestions() {
  if (typeof EXAM_DATA !== 'undefined' && EXAM_DATA[state.subject]) {
    return EXAM_DATA[state.subject];
  }
  if (typeof EXAM_QUESTIONS !== 'undefined') {
    return EXAM_QUESTIONS;
  }
  return [];
}

function setSubject(subj) {
  state.subject = subj;
  localStorage.setItem('exam_subject', subj);

  if (subj === 'pm2') {
    elements.subjectBtnPm1.classList.remove('active');
    elements.subjectBtnPm2.classList.add('active');
    elements.headerTitle.textContent = 'Экзамен ПМ2';
    elements.heroTitle.textContent = 'Тестирование по профессиональному модулю ПМ2';
    elements.heroSubtitle.textContent = 'Компьютерная графика, 2D/3D моделирование и дизайн (Photoshop, Blender, Krita, GIMP, SketchUp, Tinkercad). В каждом вопросе только один правильный ответ.';
    elements.badgeText.textContent = '169 уникальных вопросов • Без повторений';
    if (elements.questionCountSelect && elements.questionCountSelect.options) elements.questionCountSelect.options[0].text = 'Все вопросы (169)';
    if (elements.optAllText) elements.optAllText.textContent = 'Все вопросы (169)';
    if (elements.questionCountSelect && elements.questionCountSelect.value === 'all' && elements.selectedCountLabel) elements.selectedCountLabel.textContent = 'Все вопросы (169)';
  } else {
    elements.subjectBtnPm2.classList.remove('active');
    elements.subjectBtnPm1.classList.add('active');
    elements.headerTitle.textContent = 'Экзамен ПМ1';
    elements.heroTitle.textContent = 'Тестирование по профессиональному модулю ПМ1';
    elements.heroSubtitle.textContent = 'Архитектура ПК, операционные системы, диагностика и сети. В каждом вопросе несколько вариантов ответа и только один правильный.';
    elements.badgeText.textContent = '161 уникальный вопрос • Без повторений';
    if (elements.questionCountSelect && elements.questionCountSelect.options) elements.questionCountSelect.options[0].text = 'Все вопросы (161)';
    if (elements.optAllText) elements.optAllText.textContent = 'Все вопросы (161)';
    if (elements.questionCountSelect && elements.questionCountSelect.value === 'all' && elements.selectedCountLabel) elements.selectedCountLabel.textContent = 'Все вопросы (161)';
  }
}

// --- Utility: Shuffle Array ---
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- Start Quiz ---
function startQuiz(customQuestions = null) {
  const subjectQuestions = getCurrentSubjectQuestions();
  if (!subjectQuestions || !subjectQuestions.length) {
    alert('Ошибка: вопросы не загружены.');
    return;
  }

  let pool = customQuestions ? [...customQuestions] : [...subjectQuestions];

  const shuffleQ = elements.shuffleQuestionsCheck.checked;
  const shuffleOpt = elements.shuffleOptionsCheck.checked;
  const countChoice = elements.questionCountSelect.value;

  if (shuffleQ && !customQuestions) {
    pool = shuffleArray(pool);
  }

  if (!customQuestions && countChoice !== 'all') {
    const limit = parseInt(countChoice, 10);
    pool = pool.slice(0, limit);
  }

  state.questions = pool.map(item => {
    let opts = [...item.options];
    let correctIdx = item.correct;

    if (shuffleOpt) {
      const indexedOpts = opts.map((text, idx) => ({ text, isCorrect: idx === correctIdx }));
      const shuffled = shuffleArray(indexedOpts);
      opts = shuffled.map(o => o.text);
      correctIdx = shuffled.findIndex(o => o.isCorrect);
    }

    return {
      id: item.id,
      question: item.question,
      options: opts,
      correct: correctIdx,
      userAnswer: null
    };
  });

  state.currentIndex = 0;
  state.startTime = Date.now();
  state.endTime = null;

  // Set mode badge
  if (state.mode === 'practice') {
    elements.quizModeBadge.className = 'mode-badge mode-practice';
    elements.quizModeBadge.innerHTML = SVG_ICONS.bulbBadge + ' <span>Обучение</span>';
    elements.quizTimer.style.display = 'none';
  } else {
    elements.quizModeBadge.className = 'mode-badge mode-exam';
    const label = state.questions.length === 30 ? 'Экзамен • Вариант (30 вопр.)' : 'Экзамен';
    elements.quizModeBadge.innerHTML = SVG_ICONS.timerBadge + ' <span>' + label + '</span>';
    elements.quizTimer.style.display = 'inline-flex';
    initTimer();
  }

  renderNavGrid();
  renderCurrentQuestion();
  showScreen(elements.quizScreen);
}

// --- Timer for Exam Mode ---
function initTimer() {
  clearInterval(state.timerInterval);
  // Give 1 minute per question, minimum 15 mins
  state.timerSeconds = Math.max(state.questions.length * 60, 15 * 60);
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerInterval);
      alert('Время экзамена истекло! Тест автоматически завершается.');
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(state.timerSeconds / 60);
  const s = state.timerSeconds % 60;
  const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  elements.quizTimer.querySelector('span').textContent = formatted;

  if (state.timerSeconds <= 300) { // < 5 minutes
    elements.quizTimer.classList.add('warning');
  } else {
    elements.quizTimer.classList.remove('warning');
  }
}

// --- Render Current Question ---
function renderCurrentQuestion() {
  const q = state.questions[state.currentIndex];
  const total = state.questions.length;

  elements.questionCounter.textContent = `Вопрос ${state.currentIndex + 1} из ${total}`;
  if (q.id && q.id !== (state.currentIndex + 1)) {
    elements.questionCategory.textContent = `Вопрос #${state.currentIndex + 1} (Билет #${q.id})`;
  } else {
    elements.questionCategory.textContent = `Вопрос #${state.currentIndex + 1}`;
  }
  elements.questionText.textContent = q.question;

  const progressPercent = ((state.currentIndex + 1) / total) * 100;
  elements.progressBar.style.width = `${progressPercent}%`;

  // Render options
  elements.optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';

    const letterSpan = document.createElement('span');
    letterSpan.className = 'option-letter';
    letterSpan.textContent = letters[optIdx] || (optIdx + 1);

    const contentSpan = document.createElement('span');
    contentSpan.className = 'option-content';
    contentSpan.textContent = optText;

    btn.appendChild(letterSpan);
    btn.appendChild(contentSpan);

    // Apply state if already answered
    if (q.userAnswer !== null) {
      if (state.mode === 'practice') {
        if (optIdx === q.correct) {
          btn.classList.add('correct');
        } else if (optIdx === q.userAnswer) {
          btn.classList.add('wrong');
        }
      } else {
        if (optIdx === q.userAnswer) {
          btn.classList.add('selected');
        }
      }
    }

    btn.addEventListener('click', () => handleSelectOption(optIdx));
    elements.optionsContainer.appendChild(btn);
  });

  // Update button texts
  elements.prevBtn.style.visibility = state.currentIndex === 0 ? 'hidden' : 'visible';
  if (state.currentIndex === total - 1) {
    elements.nextBtn.innerHTML = '<span>Завершить</span> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-left: 5px;"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>';
  } else {
    elements.nextBtn.innerHTML = '<span>Далее →</span>';
  }

  updateNavGridActive();
  updateAnsweredCounter();
}

// --- Handle Option Selection ---
function handleSelectOption(optIdx) {
  const q = state.questions[state.currentIndex];
  q.userAnswer = optIdx;

  if (state.mode === 'practice') {
    // In practice mode, render immediately with correct/wrong highlight
    renderCurrentQuestion();
  } else {
    // In exam mode, mark selected
    const allBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach((b, idx) => {
      b.classList.toggle('selected', idx === optIdx);
    });
  }

  updateNavGridItem(state.currentIndex);
  updateAnsweredCounter();
}

// --- Navigation Grid ---
function renderNavGrid() {
  elements.questionNavGrid.innerHTML = '';
  state.questions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'nav-num-btn';
    btn.textContent = idx + 1;
    btn.title = q.id && q.id !== (idx + 1) ? `Вопрос ${idx + 1} (Билет #${q.id})` : `Вопрос ${idx + 1}`;
    btn.addEventListener('click', () => {
      state.currentIndex = idx;
      renderCurrentQuestion();
    });
    elements.questionNavGrid.appendChild(btn);
  });
}

function updateNavGridActive() {
  const btns = elements.questionNavGrid.querySelectorAll('.nav-num-btn');
  btns.forEach((btn, idx) => {
    btn.classList.toggle('current', idx === state.currentIndex);
  });
}

function updateNavGridItem(idx) {
  const btns = elements.questionNavGrid.querySelectorAll('.nav-num-btn');
  const btn = btns[idx];
  if (!btn) return;

  const q = state.questions[idx];
  if (q.userAnswer === null) {
    btn.className = 'nav-num-btn';
  } else if (state.mode === 'practice') {
    if (q.userAnswer === q.correct) {
      btn.className = 'nav-num-btn correct';
    } else {
      btn.className = 'nav-num-btn wrong';
    }
  } else {
    btn.className = 'nav-num-btn answered';
  }

  if (idx === state.currentIndex) {
    btn.classList.add('current');
  }
}

function updateAnsweredCounter() {
  const answered = state.questions.filter(q => q.userAnswer !== null).length;
  elements.answeredStats.textContent = `Отвечено: ${answered} / ${state.questions.length}`;
}
// --- Finish Quiz & Show Results ---
function finishQuiz() {
  clearInterval(state.timerInterval);
  state.endTime = Date.now();

  const total = state.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;
  const errors = [];

  state.questions.forEach(q => {
    if (q.userAnswer === null) {
      skippedCount++;
      errors.push(q);
    } else if (q.userAnswer === q.correct) {
      correctCount++;
    } else {
      wrongCount++;
      errors.push(q);
    }
  });

  state.lastErrors = errors;

  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  elements.resPercent.textContent = `${percent}%`;
  elements.resFraction.textContent = `${correctCount} / ${total}`;

  elements.statCorrect.textContent = correctCount;
  elements.statWrong.textContent = wrongCount;
  elements.statSkipped.textContent = skippedCount;

  // Format elapsed time
  const elapsedSeconds = Math.round((state.endTime - state.startTime) / 1000);
  const m = Math.floor(elapsedSeconds / 60);
  const s = elapsedSeconds % 60;
  elements.statTime.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  // Calculate Grade
  let gradeText = '';
  let gradeClass = '';
  let gradeMsg = '';

  if (percent >= 85) {
    gradeText = 'Отлично (5)';
    gradeClass = 'grade-badge grade-5';
    gradeMsg = 'Великолепный результат! Вы отлично знаете материал профессионального модуля.';
  } else if (percent >= 70) {
    gradeText = 'Хорошо (4)';
    gradeClass = 'grade-badge grade-4';
    gradeMsg = 'Хороший результат! Вы уверенно ориентируетесь в вопросах.';
  } else if (percent >= 50) {
    gradeText = 'Удовлетворительно (3)';
    gradeClass = 'grade-badge grade-3';
    gradeMsg = 'Тест сдан, но есть пробелы. Рекомендуется повторить вопросы с ошибками.';
  } else {
    gradeText = 'Неудовлетворительно (2)';
    gradeClass = 'grade-badge grade-2';
    gradeMsg = 'К сожалению, порог не пройден. Потренируйтесь в режиме «Обучение» и попробуйте снова.';
  }

  if (total === 30 && state.mode === 'exam') {
    gradeMsg += ' Экзаменационный вариант (30 вопросов) завершён.';
  }

  elements.gradeBadge.className = gradeClass;
  elements.gradeBadge.textContent = gradeText;
  elements.gradeMessage.textContent = gradeMsg;

  // Toggle Retry Errors Button
  if (errors.length > 0) {
    elements.retryErrorsBtn.style.display = 'inline-flex';
    const retryLabel = document.getElementById('retryErrorsLabel');
    if (retryLabel) {
      retryLabel.textContent = `Повторить ошибки (${errors.length})`;
    } else {
      elements.retryErrorsBtn.innerHTML = `<svg class="btn-action-svg" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> <span>Повторить ошибки (${errors.length})</span>`;
    }
  } else {
    elements.retryErrorsBtn.style.display = 'none';
  }

  renderReviewList('all');
  showScreen(elements.resultsScreen);
}

// --- Render Review List ---
function renderReviewList(filter) {
  elements.reviewContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  let list = state.questions;
  if (filter === 'wrong') {
    list = state.questions.filter(q => q.userAnswer === null || q.userAnswer !== q.correct);
  } else if (filter === 'correct') {
    list = state.questions.filter(q => q.userAnswer !== null && q.userAnswer === q.correct);
  }

  if (list.length === 0) {
    elements.reviewContainer.innerHTML = '<p style="color: var(--text-muted); padding: 1rem 0;">В этой категории вопросов нет.</p>';
    return;
  }

  list.forEach((q, idx) => {
    const isCorrect = q.userAnswer === q.correct;
    const isSkipped = q.userAnswer === null;

    const item = document.createElement('div');
    item.className = `review-item ${isCorrect ? 'is-correct' : (isSkipped ? 'is-skipped' : 'is-wrong')}`;

    const originalIdx = state.questions.indexOf(q) + 1;
    const qTitle = document.createElement('div');
    qTitle.className = 'review-q';
    qTitle.textContent = `${originalIdx}. ${q.question}`;
    item.appendChild(qTitle);

    if (isSkipped) {
      const skipNotice = document.createElement('div');
      skipNotice.className = 'review-answer user-wrong';
      skipNotice.innerHTML = SVG_ICONS.cross + ' <span>Ответ не был дан</span>';
      item.appendChild(skipNotice);
    } else if (!isCorrect) {
      const userAns = document.createElement('div');
      userAns.className = 'review-answer user-wrong';
      const userLetter = letters[q.userAnswer] || '';
      userAns.innerHTML = SVG_ICONS.cross + ` <span>Ваш ответ: <strong>${userLetter})</strong> ${q.options[q.userAnswer]}</span>`;
      item.appendChild(userAns);
    }

    const correctAns = document.createElement('div');
    correctAns.className = 'review-answer correct-ans';
    const corrLetter = letters[q.correct] || '';
    correctAns.innerHTML = SVG_ICONS.check + ` <span>Правильный ответ: <strong>${corrLetter})</strong> ${q.options[q.correct]}</span>`;
    item.appendChild(correctAns);

    elements.reviewContainer.appendChild(item);
  });
}

// --- Cheatsheet / Search Functionality ---
function openSearchModal() {
  elements.searchModal.classList.add('open');
  elements.searchInput.value = '';
  renderSearchResults('');
  setTimeout(() => elements.searchInput.focus(), 100);
}

function closeSearchModal() {
  elements.searchModal.classList.remove('open');
}

function renderSearchResults(query) {
  elements.searchResultsList.innerHTML = '';
  const qClean = query.trim().toLowerCase();
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const subjectQuestions = getCurrentSubjectQuestions();
  if (!subjectQuestions || !subjectQuestions.length) return;

  const results = subjectQuestions.filter(item => {
    if (!qClean) return true;
    return item.question.toLowerCase().includes(qClean) ||
           (item.section && item.section.toLowerCase().includes(qClean)) ||
           item.options.some(opt => opt.toLowerCase().includes(qClean));
  });

  if (results.length === 0) {
    elements.searchResultsList.innerHTML = '<p style="color: var(--text-muted); padding: 1rem;">Ничего не найдено по вашему запросу.</p>';
    return;
  }

  const countBar = document.createElement('div');
  countBar.style.padding = '0.2rem 0.25rem 0.6rem';
  countBar.style.fontSize = '0.82rem';
  countBar.style.fontWeight = '600';
  countBar.style.color = 'var(--text-muted)';
  countBar.textContent = qClean ? `Найдено вопросов: ${results.length} из ${subjectQuestions.length}` : `Все вопросы модуля (${results.length}):`;
  elements.searchResultsList.appendChild(countBar);

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'search-item';

    if (item.section) {
      const secTag = document.createElement('div');
      secTag.style.fontSize = '0.75rem';
      secTag.style.fontWeight = '700';
      secTag.style.color = 'var(--primary)';
      secTag.style.marginBottom = '0.25rem';
      secTag.textContent = item.section;
      card.appendChild(secTag);
    }

    const qText = document.createElement('div');
    qText.className = 'search-item-q';
    qText.textContent = `#${item.id}. ${item.question}`;
    card.appendChild(qText);

    const ansText = document.createElement('div');
    ansText.className = 'search-item-ans';
    const corrLetter = letters[item.correct] || '';
    ansText.innerHTML = SVG_ICONS.check + ` <span>${corrLetter}) ${item.options[item.correct]}</span>`;
    card.appendChild(ansText);

    elements.searchResultsList.appendChild(card);
  });
}


// --- Custom Dropdown Logic ---
function selectCountOption(val) {
  if (elements.questionCountSelect) {
    elements.questionCountSelect.value = val;
  }
  const items = document.querySelectorAll('#countDropdownMenu .dropdown-item');
  items.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-value') === val);
  });
  if (elements.selectedCountLabel) {
    if (val === 'all') {
      elements.selectedCountLabel.textContent = state.subject === 'pm2' ? 'Все вопросы (169)' : 'Все вопросы (161)';
    } else if (val === '30') {
      elements.selectedCountLabel.textContent = '30 вопросов (Вариант экзамена)';
    } else {
      elements.selectedCountLabel.textContent = `${val} случайных вопросов`;
    }
  }
  if (elements.countDropdownWrapper) {
    elements.countDropdownWrapper.classList.remove('open');
  }
}

function initDropdownEvents() {
  if (!elements.countDropdownTrigger) return;
  elements.countDropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.countDropdownWrapper.classList.toggle('open');
  });

  const items = document.querySelectorAll('#countDropdownMenu .dropdown-item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      selectCountOption(item.getAttribute('data-value'));
    });
  });

  document.addEventListener('click', (e) => {
    if (elements.countDropdownWrapper && !elements.countDropdownWrapper.contains(e.target)) {
      elements.countDropdownWrapper.classList.remove('open');
    }
  });
}

// --- Event Listeners Setup ---
function setupEvents() {
  // Theme toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Subject Selection
  elements.subjectBtnPm1.addEventListener('click', () => setSubject('pm1'));
  elements.subjectBtnPm2.addEventListener('click', () => setSubject('pm2'));

  // Logo / Home click
  elements.headerLogo.addEventListener('click', () => {
    if (elements.quizScreen.classList.contains('active')) {
      showConfirm('Прервать тестирование?', 'Текущий прогресс будет сброшен. Вернуться на главную страницу?', () => {
        clearInterval(state.timerInterval);
        showScreen(elements.startScreen);
      }, 'home');
    } else {
      showScreen(elements.startScreen);
    }
  });

  // Mode Selection Cards
  elements.modeCardPractice.addEventListener('click', () => {
    state.mode = 'practice';
    elements.modeCardPractice.classList.add('selected');
    elements.modeCardExam.classList.remove('selected');
    if (elements.shuffleQuestionsCheck) {
      elements.shuffleQuestionsCheck.checked = false;
    }
  });

  elements.modeCardExam.addEventListener('click', () => {
    state.mode = 'exam';
    elements.modeCardExam.classList.add('selected');
    elements.modeCardPractice.classList.remove('selected');
    selectCountOption('30');
    if (elements.shuffleQuestionsCheck) {
      elements.shuffleQuestionsCheck.checked = true;
    }
  });

  // Start Test Button
  elements.startBtn.addEventListener('click', () => startQuiz());

  // Navigation Buttons
  elements.prevBtn.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentQuestion();
    }
  });

  elements.nextBtn.addEventListener('click', () => {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      renderCurrentQuestion();
    } else {
      // Last question -> Finish
      const unans = state.questions.filter(q => q.userAnswer === null).length;
      if (unans > 0) {
        showConfirm('Остались вопросы', `У вас осталось неотвеченных вопросов: ${unans}. Всё равно завершить тест и посмотреть результаты?`, () => {
          finishQuiz();
        }, 'time');
      } else {
        finishQuiz();
      }
    }
  });

  // Exit Quiz Button
  elements.exitQuizBtn.addEventListener('click', () => {
    showConfirm('Завершить тест?', 'Вы уверены, что хотите завершить тестирование и перейти к результатам?', () => {
      finishQuiz();
    }, 'finish');
  });

  // Confirmation Modal Events
  elements.confirmCancelBtn.addEventListener('click', closeConfirm);
  elements.confirmOkBtn.addEventListener('click', () => {
    const cb = confirmCallback;
    closeConfirm();
    if (cb) cb();
  });
  elements.confirmModal.addEventListener('click', e => {
    if (e.target === elements.confirmModal) closeConfirm();
  });

  // Results Buttons
  elements.retryAllBtn.addEventListener('click', () => {
    startQuiz();
  });

  elements.retryErrorsBtn.addEventListener('click', () => {
    if (state.lastErrors && state.lastErrors.length > 0) {
      startQuiz(state.lastErrors);
    }
  });

  elements.resultsHomeBtn.addEventListener('click', () => {
    showScreen(elements.startScreen);
  });

  // Filter Review
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReviewList(btn.getAttribute('data-filter'));
    });
  });

  // Search / Cheatsheet Modal
  elements.searchBtn.addEventListener('click', openSearchModal);
  elements.openSearchFromHomeBtn.addEventListener('click', openSearchModal);
  elements.closeSearchBtn.addEventListener('click', closeSearchModal);
  elements.searchModal.addEventListener('click', e => {
    if (e.target === elements.searchModal) closeSearchModal();
  });

  elements.searchInput.addEventListener('input', e => {
    renderSearchResults(e.target.value);
  });

  // Keyboard Navigation
  window.addEventListener('keydown', e => {
    if (elements.searchModal.classList.contains('open')) {
      if (e.key === 'Escape') closeSearchModal();
      return;
    }

    if (!elements.quizScreen.classList.contains('active')) return;

    // Keys 1-5 or A-E to select options
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      handleSelectOption(num - 1);
    } else if (['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'].includes(e.key)) {
      const charCode = e.key.toUpperCase().charCodeAt(0) - 65;
      if (charCode >= 0 && charCode <= 4) {
        handleSelectOption(charCode);
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      elements.nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      elements.prevBtn.click();
    }
  });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const savedSubject = localStorage.getItem('exam_subject') || 'pm1';
  setSubject(savedSubject);
  setupEvents();
  initDropdownEvents();
});

