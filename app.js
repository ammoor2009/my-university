/* =============================================
   جدولي الجامعي | My University Schedule
   ============================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'myUniversitySchedule_v1';
  const LOGO_PATH = 'assets/philadelphia-university-logo.png';
  const DAY_KEYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];
  const DAY_ORDER = { sat: 0, sun: 1, mon: 2, tue: 3, wed: 4, thu: 5 };

  const PRINT_WIDTH = 900;

  const I18N = {
    ar: {
      dir: 'rtl',
      appTitle: 'جدولي الجامعي',
      appSubtitle: 'جامعة فيلادلفيا',
      langLabel: 'اللغة',
      academicTitle: 'البيانات الأكاديمية',
      facultyName: 'اسم عضو هيئة التدريس',
      facultyPlaceholder: 'مثال: د. أحمد محمد',
      universityName: 'اسم الجامعة',
      universityValue: 'جامعة فيلادلفيا',
      collegeName: 'اسم الكلية',
      collegePlaceholder: 'مثال: كلية الآداب والعلوم التربوية',
      departmentName: 'اسم القسم',
      departmentPlaceholder: 'مثال: قسم اللغة العربية وآدابها',
      semester: 'الفصل الدراسي',
      semPlaceholder: 'اختر الفصل',
      semFirst: 'الفصل الأول',
      semSecond: 'الفصل الثاني',
      semSummer: 'الفصل الصيفي',
      academicYear: 'العام الدراسي',
      activityTitle: 'إضافة نشاط إلى الجدول',
      activityType: 'نوع النشاط',
      typeLecture: 'محاضرة',
      typeOffice: 'ساعة مكتبية',
      courseName: 'اسم المساق',
      coursePlaceholder: 'مثال: برمجة 1',
      roomNumber: 'رقم القاعة / المكتب',
      roomPlaceholder: 'مثال: IT-324',
      labelDays: 'اليوم / الأيام',
      daySat: 'السبت', daySun: 'الأحد', dayMon: 'الاثنين',
      dayTue: 'الثلاثاء', dayWed: 'الأربعاء', dayThu: 'الخميس',
      labelStartTime: 'وقت البداية (اختياري)',
      labelEndTime: 'وقت النهاية (اختياري)',
      addBtn: 'إضافة إلى الجدول',
      saveEditBtn: 'حفظ التعديلات',
      cancelEditBtn: 'إلغاء التعديل',
      editHint: 'وضع التعديل — عدّل البيانات ثم اضغط «حفظ التعديلات»',
      tablesTitle: 'الجداول',
      lecturesTitle: 'جدول المحاضرات',
      officeTitle: 'جدول الساعات المكتبية',
      thNum: '#', thCourse: 'اسم المساق', thDay: 'اليوم',
      thTime: 'الوقت', thRoom: 'القاعة', thActions: 'الإجراءات',
      thONum: '#', thODay: 'اليوم',
      thOTime: 'الوقت', thORoom: 'المكتب', thOActions: 'الإجراءات',
      lecturesEmpty: 'لا توجد محاضرات بعد. أضف أول محاضرة من النموذج أعلاه.',
      officeEmpty: 'لا توجد ساعات مكتبية بعد. أضف أول ساعة من النموذج أعلاه.',
      exportTitle: 'التصدير',
      exportWordBtn: 'تصدير إلى Word',
      exportPdfBtn: 'تصدير إلى PDF',
      clearAllBtn: 'مسح جميع البيانات',
      storageNote: 'يتم حفظ البيانات محليًا في هذا المتصفح فقط. لا تتم المزامنة بين الأجهزة.',
      editBtn: 'تعديل', delBtn: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذا النشاط؟',
      confirmClear: 'هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.',
      confirmYes: 'نعم، تأكيد', confirmNo: 'إلغاء',
      msgFillRequired: 'يرجى تعبئة اسم عضو هيئة التدريس ونوع النشاط واليوم على الأقل.',
      msgCourseRequired: 'يرجى إدخال اسم المساق للمحاضرة.',
      msgRoomRequired: 'يرجى إدخال رقم القاعة أو المكتب.',
      msgTimeInvalid: 'وقت النهاية يجب أن يكون بعد وقت البداية.',
      msgAdded: 'تمت إضافة النشاط بنجاح.',
      msgUpdated: 'تم حفظ التعديلات بنجاح.',
      msgDeleted: 'تم حذف النشاط.',
      msgCleared: 'تم مسح جميع البيانات.',
      msgDuplicate: 'هذا النشاط موجود مسبقًا بنفس التفاصيل.',
      msgExporting: 'جاري التصدير...',
      msgExportError: 'حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.',
      msgNoData: 'لا توجد بيانات للتصدير. أضف بعض الأنشطة أولاً.',
      msgLibMissing: 'مكتبة التصدير غير محملة. تحقق من الاتصال بالإنترنت.',
      pdfTitle: 'جدول المحاضرات والساعات المكتبية',
      wordTitle: 'جدول المحاضرات والساعات المكتبية',
      printFaculty: 'عضو هيئة التدريس',
      printCollege: 'الكلية',
      printDepartment: 'القسم',
      printSemester: 'الفصل الدراسي',
      printYear: 'العام الدراسي',
      printUniversity: 'جامعة فيلادلفيا',
      timeFrom: 'من', timeTo: 'إلى', notSpecified: '—',
      footerText: ' جميع الحقوق محفوظة 2026©- د.عمر الرواجفة',
    },
    en: {
      dir: 'ltr',
      appTitle: 'My University Schedule',
      appSubtitle: 'Philadelphia University',
      langLabel: 'Language',
      academicTitle: 'Academic Information',
      facultyName: 'Faculty Member Name',
      facultyPlaceholder: 'e.g., Dr. Ahmad Mohammad',
      universityName: 'University',
      universityValue: 'Philadelphia University',
      collegeName: 'College',
      collegePlaceholder: 'e.g., College of Arts and Educational Sciences',
      departmentName: 'Department',
      departmentPlaceholder: 'e.g., Arabic Language Department.',
      semester: 'Semester',
      semPlaceholder: 'Select semester',
      semFirst: 'First Semester',
      semSecond: 'Second Semester',
      semSummer: 'Summer Semester',
      academicYear: 'Academic Year',
      activityTitle: 'Add Activity to Schedule',
      activityType: 'Activity Type',
      typeLecture: 'Lecture',
      typeOffice: 'Office Hour',
      courseName: 'Course Name',
      coursePlaceholder: 'e.g., Programming 1',
      roomNumber: 'Room / Office Number',
      roomPlaceholder: 'e.g., IT-324',
      labelDays: 'Day(s)',
      daySat: 'Saturday', daySun: 'Sunday', dayMon: 'Monday',
      dayTue: 'Tuesday', dayWed: 'Wednesday', dayThu: 'Thursday',
      labelStartTime: 'Start Time (optional)',
      labelEndTime: 'End Time (optional)',
      addBtn: 'Add to Schedule',
      saveEditBtn: 'Save Changes',
      cancelEditBtn: 'Cancel Edit',
      editHint: 'Edit mode — modify the data then click "Save Changes"',
      tablesTitle: 'Schedules',
      lecturesTitle: 'Lectures Schedule',
      officeTitle: 'Office Hours Schedule',
      thNum: '#', thCourse: 'Course Name', thDay: 'Day',
      thTime: 'Time', thRoom: 'Room', thActions: 'Actions',
      thONum: '#', thODay: 'Day',
      thOTime: 'Time', thORoom: 'Office', thOActions: 'Actions',
      lecturesEmpty: 'No lectures yet. Add your first lecture from the form above.',
      officeEmpty: 'No office hours yet. Add your first office hour from the form above.',
      exportTitle: 'Export',
      exportWordBtn: 'Export to Word',
      exportPdfBtn: 'Export to PDF',
      clearAllBtn: 'Clear All Data',
      storageNote: 'Data is saved locally in this browser only. It is not synced across devices.',
      editBtn: 'Edit', delBtn: 'Delete',
      confirmDelete: 'Are you sure you want to delete this activity?',
      confirmClear: 'Are you sure you want to clear all data? This action cannot be undone.',
      confirmYes: 'Yes, Confirm', confirmNo: 'Cancel',
      msgFillRequired: 'Please fill in the faculty member name, activity type, and at least one day.',
      msgCourseRequired: 'Please enter the course name for the lecture.',
      msgRoomRequired: 'Please enter the room or office number.',
      msgTimeInvalid: 'End time must be after start time.',
      msgAdded: 'Activity added successfully.',
      msgUpdated: 'Changes saved successfully.',
      msgDeleted: 'Activity deleted.',
      msgCleared: 'All data cleared.',
      msgDuplicate: 'This activity already exists with the same details.',
      msgExporting: 'Exporting...',
      msgExportError: 'An error occurred during export. Please try again.',
      msgNoData: 'No data to export. Please add some activities first.',
      msgLibMissing: 'Export library not loaded. Check your internet connection.',
      pdfTitle: 'Lectures and Office Hours Schedule',
      wordTitle: 'Lectures and Office Hours Schedule',
      printFaculty: 'Faculty Member',
      printCollege: 'College',
      printDepartment: 'Department',
      printSemester: 'Semester',
      printYear: 'Academic Year',
      printUniversity: 'Philadelphia University',
      timeFrom: 'From', timeTo: 'To', notSpecified: '—',
      footerText: '© 2026 Dr. Omar Al-Rawajfeh — All Rights Reserved',
    }
  };

  let currentLang = 'ar';
  let activities = [];
  let editingId = null;

  const $ = (id) => document.getElementById(id);

  const el = {
    langSelect: $('langSelect'),
    appTitle: $('appTitle'),
    appSubtitle: $('appSubtitle'),
    langLabel: $('langLabel'),
    academicTitle: $('academicTitle'),
    labelFacultyName: $('labelFacultyName'),
    facultyName: $('facultyName'),
    labelUniversity: $('labelUniversity'),
    universityName: $('universityName'),
    labelCollege: $('labelCollege'),
    collegeName: $('collegeName'),
    labelDepartment: $('labelDepartment'),
    departmentName: $('departmentName'),
    labelSemester: $('labelSemester'),
    semester: $('semester'),
    semPlaceholder: $('semPlaceholder'),
    semFirst: $('semFirst'),
    semSecond: $('semSecond'),
    semSummer: $('semSummer'),
    labelYear: $('labelYear'),
    academicYear: $('academicYear'),
    activityTitle: $('activityTitle'),
    labelActivityType: $('labelActivityType'),
    activityType: $('activityType'),
    typeLecture: $('typeLecture'),
    typeOffice: $('typeOffice'),
    labelCourseName: $('labelCourseName'),
    courseName: $('courseName'),
    labelRoom: $('labelRoom'),
    roomNumber: $('roomNumber'),
    labelDays: $('labelDays'),
    labelStartTime: $('labelStartTime'),
    startTime: $('startTime'),
    labelEndTime: $('labelEndTime'),
    endTime: $('endTime'),
    addBtn: $('addBtn'),
    cancelEditBtn: $('cancelEditBtn'),
    editHint: $('editHint'),
    tablesTitle: $('tablesTitle'),
    lecturesTitle: $('lecturesTitle'),
    officeTitle: $('officeTitle'),
    thNum: $('thNum'),
    thCourse: $('thCourse'),
    thDay: $('thDay'),
    thTime: $('thTime'),
    thRoom: $('thRoom'),
    thActions: $('thActions'),
    thONum: $('thONum'),
    thODay: $('thODay'),
    thOTime: $('thOTime'),
    thORoom: $('thORoom'),
    thOActions: $('thOActions'),
    lecturesBody: $('lecturesBody'),
    officeBody: $('officeBody'),
    lecturesEmpty: $('lecturesEmpty'),
    officeEmpty: $('officeEmpty'),
    exportTitle: $('exportTitle'),
    exportWordBtn: $('exportWordBtn'),
    exportPdfBtn: $('exportPdfBtn'),
    clearAllBtn: $('clearAllBtn'),
    storageNote: $('storageNote'),
    confirmOverlay: $('confirmOverlay'),
    confirmMessage: $('confirmMessage'),
    confirmYes: $('confirmYes'),
    confirmNo: $('confirmNo'),
    toast: $('toast'),
    printArea: $('printArea'),
    footerText: $('footerText'),
  };

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
  }

  function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getSelectedDays() {
    const checked = document.querySelectorAll('#daysGrid input[type="checkbox"]:checked');
    return Array.from(checked).map((cb) => cb.value);
  }

  function getSemesterLabel(value) {
    const map = { first: t('semFirst'), second: t('semSecond'), summer: t('semSummer') };
    return map[value] || value;
  }

  function getDayLabel(key) {
    const map = {
      sat: t('daySat'), sun: t('daySun'), mon: t('dayMon'),
      tue: t('dayTue'), wed: t('dayWed'), thu: t('dayThu'),
    };
    return map[key] || key;
  }

  // تحويل الوقت من 24 ساعة إلى 12 ساعة
  function to12Hour(timeStr, periodKey) {
    if (!timeStr) return timeStr;
    const m = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return timeStr;
    let h = parseInt(m[1], 10);
    const mn = m[2];
    if (isNaN(h)) return timeStr;
    // تحديد ص/م تلقائيًا
    const isPM = h >= 12;
    const suffix = isPM ? ' م' : ' ص';
    // تحويل الساعة إلى نطاق 1-12
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${mn}${suffix}`;
  }

  function formatTimeRange(start, end) {
    if (!start && !end) return t('notSpecified');
    if (start && end) return `${to12Hour(start)} - ${to12Hour(end)}`;
    if (start) return `${t('timeFrom')} ${to12Hour(start)}`;
    return `${t('timeTo')} ${to12Hour(end)}`;
  }

  function sortActivitiesByDay(list) {
    return list.slice().sort((a, b) => {
      const dayA = Math.min(...a.days.map((d) => DAY_ORDER[d] ?? 99));
      const dayB = Math.min(...b.days.map((d) => DAY_ORDER[d] ?? 99));
      return dayA - dayB;
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    const dir = dict.dir;

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.classList.toggle('lang-en', lang === 'en');

    el.appTitle.textContent = t('appTitle');
    el.appSubtitle.textContent = t('appSubtitle');
    el.langLabel.textContent = t('langLabel');

    el.academicTitle.textContent = t('academicTitle');
    el.labelFacultyName.textContent = t('facultyName');
    el.facultyName.placeholder = t('facultyPlaceholder');
    el.labelUniversity.textContent = t('universityName');
    el.universityName.value = t('universityValue');
    el.labelCollege.textContent = t('collegeName');
    el.collegeName.placeholder = t('collegePlaceholder');
    el.labelDepartment.textContent = t('departmentName');
    el.departmentName.placeholder = t('departmentPlaceholder');
    el.labelSemester.textContent = t('semester');
    el.semPlaceholder.textContent = t('semPlaceholder');
    el.semFirst.textContent = t('semFirst');
    el.semSecond.textContent = t('semSecond');
    el.semSummer.textContent = t('semSummer');
    el.labelYear.textContent = t('academicYear');

    el.activityTitle.textContent = t('activityTitle');
    el.labelActivityType.textContent = t('activityType');
    el.typeLecture.textContent = t('typeLecture');
    el.typeOffice.textContent = t('typeOffice');
    el.labelCourseName.textContent = t('courseName');
    el.courseName.placeholder = t('coursePlaceholder');
    el.labelRoom.textContent = t('roomNumber');
    el.roomNumber.placeholder = t('roomPlaceholder');
    el.labelDays.textContent = t('labelDays');
    el.labelStartTime.textContent = t('labelStartTime');
    el.labelEndTime.textContent = t('labelEndTime');
    el.addBtn.textContent = editingId ? t('saveEditBtn') : t('addBtn');
    el.cancelEditBtn.textContent = t('cancelEditBtn');
    el.editHint.textContent = t('editHint');

    const dayMap = {
      sat: 'daySat', sun: 'daySun', mon: 'dayMon',
      tue: 'dayTue', wed: 'dayWed', thu: 'dayThu',
    };
    DAY_KEYS.forEach((key) => {
      const span = document.getElementById('day' + key.charAt(0).toUpperCase() + key.slice(1));
      if (span) span.textContent = t(dayMap[key]);
    });

    el.tablesTitle.textContent = t('tablesTitle');
    el.lecturesTitle.textContent = t('lecturesTitle');
    el.officeTitle.textContent = t('officeTitle');
    el.thNum.textContent = t('thNum');
    el.thCourse.textContent = t('thCourse');
    el.thDay.textContent = t('thDay');
    el.thTime.textContent = t('thTime');
    el.thRoom.textContent = t('thRoom');
    el.thActions.textContent = t('thActions');
    el.thONum.textContent = t('thONum');
    el.thODay.textContent = t('thODay');
    el.thOTime.textContent = t('thOTime');
    el.thORoom.textContent = t('thORoom');
    el.thOActions.textContent = t('thOActions');
    el.lecturesEmpty.textContent = t('lecturesEmpty');
    el.officeEmpty.textContent = t('officeEmpty');

    el.exportTitle.textContent = t('exportTitle');
    el.exportWordBtn.textContent = t('exportWordBtn');
    el.exportPdfBtn.textContent = t('exportPdfBtn');
    el.clearAllBtn.textContent = t('clearAllBtn');
    el.storageNote.textContent = t('storageNote');

    el.confirmYes.textContent = t('confirmYes');
    el.confirmNo.textContent = t('confirmNo');

    if (el.footerText) el.footerText.textContent = t('footerText');

    renderTables();
  }

  function saveState() {
    try {
      const state = {
        lang: currentLang,
        academic: {
          facultyName: el.facultyName.value.trim(),
          collegeName: el.collegeName.value.trim(),
          departmentName: el.departmentName.value.trim(),
          semester: el.semester.value,
          academicYear: el.academicYear.value.trim(),
        },
        activities,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) { console.warn('save error:', err); }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) { return null; }
  }

  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
  }

  function renderTables() {
    const lectures = sortActivitiesByDay(activities.filter((a) => a.type === 'lecture'));
    const officeHours = sortActivitiesByDay(activities.filter((a) => a.type === 'office'));

    el.lecturesBody.innerHTML = '';
    if (lectures.length === 0) {
      el.lecturesEmpty.classList.remove('hidden');
    } else {
      el.lecturesEmpty.classList.add('hidden');
      lectures.forEach((act, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${escapeHtml(act.course)}</td>
          <td>${act.days.map(getDayLabel).join('، ')}</td>
          <td>${formatTimeRange(act.start, act.end)}</td>
          <td>${escapeHtml(act.room)}</td>
          <td><div class="actions">
            <button class="btn btn-sm btn-edit" data-action="edit" data-id="${act.id}">${t('editBtn')}</button>
            <button class="btn btn-sm btn-del" data-action="delete" data-id="${act.id}">${t('delBtn')}</button>
          </div></td>`;
        el.lecturesBody.appendChild(tr);
      });
    }

    el.officeBody.innerHTML = '';
    if (officeHours.length === 0) {
      el.officeEmpty.classList.remove('hidden');
    } else {
      el.officeEmpty.classList.add('hidden');
      officeHours.forEach((act, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${idx + 1}</td>
          <td>${act.days.map(getDayLabel).join('، ')}</td>
          <td>${formatTimeRange(act.start, act.end)}</td>
          <td>${escapeHtml(act.room)}</td>
          <td><div class="actions">
            <button class="btn btn-sm btn-edit" data-action="edit" data-id="${act.id}">${t('editBtn')}</button>
            <button class="btn btn-sm btn-del" data-action="delete" data-id="${act.id}">${t('delBtn')}</button>
          </div></td>`;
        el.officeBody.appendChild(tr);
      });
    }
  }

  function resetActivityForm(keepType) {
    if (!keepType) el.activityType.value = 'lecture';
    el.courseName.value = '';
    el.roomNumber.value = '';
    el.startTime.value = '';
    el.endTime.value = '';
    document.querySelectorAll('#daysGrid input[type="checkbox"]').forEach((cb) => { cb.checked = false; });
    updateFormVisibility();
  }

  function updateFormVisibility() {
    const isLecture = el.activityType.value === 'lecture';
    el.labelCourseName.parentElement.style.display = isLecture ? '' : 'none';
  }

  function validateForm() {
    const facultyName = el.facultyName.value.trim();
    const days = getSelectedDays();
    const type = el.activityType.value;

    if (!facultyName || days.length === 0) { showToast(t('msgFillRequired'), true); return false; }
    if (type === 'lecture' && !el.courseName.value.trim()) { showToast(t('msgCourseRequired'), true); return false; }
    if (!el.roomNumber.value.trim()) { showToast(t('msgRoomRequired'), true); return false; }

    const start = el.startTime.value;
    const end = el.endTime.value;
    if (start && end && start >= end) { showToast(t('msgTimeInvalid'), true); return false; }

    return true;
  }

  function buildActivityFromForm() {
    return {
      id: editingId || genId(),
      type: el.activityType.value,
      course: el.activityType.value === 'lecture' ? el.courseName.value.trim() : '',
      room: el.roomNumber.value.trim(),
      days: getSelectedDays(),
      start: el.startTime.value,
      end: el.endTime.value,
    };
  }

  function isDuplicate(newAct) {
    return activities.some((a) => {
      if (a.id === newAct.id) return false;
      if (a.type !== newAct.type) return false;
      if (a.course !== newAct.course) return false;
      if (a.room !== newAct.room) return false;
      if (a.start !== newAct.start || a.end !== newAct.end) return false;
      if (a.days.length !== newAct.days.length) return false;
      const sortedA = a.days.slice().sort();
      const sortedB = newAct.days.slice().sort();
      return sortedA.every((d, i) => d === sortedB[i]);
    });
  }

  function handleAddOrUpdate() {
    if (!validateForm()) return;
    const act = buildActivityFromForm();

    if (isDuplicate(act)) { showToast(t('msgDuplicate'), true); return; }

    if (editingId) {
      const idx = activities.findIndex((a) => a.id === editingId);
      if (idx !== -1) activities[idx] = act;
      editingId = null;
      el.addBtn.textContent = t('addBtn');
      el.cancelEditBtn.classList.add('hidden');
      el.editHint.classList.add('hidden');
      showToast(t('msgUpdated'));
    } else {
      activities.push(act);
      showToast(t('msgAdded'));
    }

    resetActivityForm();
    renderTables();
    saveState();
  }

  function startEdit(id) {
    const act = activities.find((a) => a.id === id);
    if (!act) return;

    editingId = id;
    el.activityType.value = act.type;
    el.courseName.value = act.course || '';
    el.roomNumber.value = act.room || '';
    el.startTime.value = act.start || '';
    el.endTime.value = act.end || '';

    document.querySelectorAll('#daysGrid input[type="checkbox"]').forEach((cb) => {
      cb.checked = act.days.includes(cb.value);
    });

    updateFormVisibility();
    el.addBtn.textContent = t('saveEditBtn');
    el.cancelEditBtn.classList.remove('hidden');
    el.editHint.classList.remove('hidden');
    el.activityTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function cancelEdit() {
    editingId = null;
    resetActivityForm();
    el.addBtn.textContent = t('addBtn');
    el.cancelEditBtn.classList.add('hidden');
    el.editHint.classList.add('hidden');
  }

  function deleteActivity(id) {
    const act = activities.find((a) => a.id === id);
    if (!act) return;
    const name = act.type === 'lecture' ? act.course : t('typeOffice');
    showConfirm(`${t('confirmDelete')}\n«${name}»`, () => {
      activities = activities.filter((a) => a.id !== id);
      if (editingId === id) cancelEdit();
      renderTables();
      saveState();
      showToast(t('msgDeleted'));
    });
  }

  let confirmCallback = null;

  function showConfirm(message, cb) {
    el.confirmMessage.textContent = message;
    confirmCallback = cb;
    el.confirmOverlay.classList.remove('hidden');
  }

  function hideConfirm() {
    el.confirmOverlay.classList.add('hidden');
    confirmCallback = null;
  }

  el.confirmYes.addEventListener('click', () => {
    if (typeof confirmCallback === 'function') confirmCallback();
    hideConfirm();
  });
  el.confirmNo.addEventListener('click', hideConfirm);
  el.confirmOverlay.addEventListener('click', (e) => {
    if (e.target === el.confirmOverlay) hideConfirm();
  });

  let toastTimer = null;

  function showToast(msg, isError) {
    clearTimeout(toastTimer);
    el.toast.textContent = msg;
    el.toast.classList.toggle('error', !!isError);
    el.toast.classList.remove('hidden');
    void el.toast.offsetWidth;
    el.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      el.toast.classList.remove('show');
      setTimeout(() => el.toast.classList.add('hidden'), 350);
    }, 2800);
  }

  function getAcademicData() {
    return {
      facultyName: el.facultyName.value.trim() || t('notSpecified'),
      collegeName: el.collegeName.value.trim() || t('notSpecified'),
      departmentName: el.departmentName.value.trim() || t('notSpecified'),
      semester: getSemesterLabel(el.semester.value) || t('notSpecified'),
      academicYear: el.academicYear.value.trim() || t('notSpecified'),
    };
  }

  function buildPrintHTML() {
    const ac = getAcademicData();
    const isAr = currentLang === 'ar';
    const dir = isAr ? 'rtl' : 'ltr';
    const fontFamily = isAr
      ? "'Tajawal', 'Segoe UI', Tahoma, sans-serif"
      : "'Inter', 'Segoe UI', sans-serif";

    const lectures = sortActivitiesByDay(activities.filter((a) => a.type === 'lecture'));
    const officeHours = sortActivitiesByDay(activities.filter((a) => a.type === 'office'));

    const lectureRows = lectures.length
      ? lectures.map((a, i) => `
        <tr>
          <td style="text-align:center">${i + 1}</td>
          <td style="text-align:center">${escapeHtml(a.course)}</td>
          <td style="text-align:center">${a.days.map(getDayLabel).join('، ')}</td>
          <td style="text-align:center; white-space:nowrap">${formatTimeRange(a.start, a.end)}</td>
          <td style="text-align:center">${escapeHtml(a.room)}</td>
        </tr>`).join('')
      : `<tr><td colspan="5" style="text-align:center;color:#888;padding:8px">${t('lecturesEmpty')}</td></tr>`;

    const officeRows = officeHours.length
      ? officeHours.map((a, i) => `
        <tr>
          <td style="text-align:center">${i + 1}</td>
          <td style="text-align:center">${a.days.map(getDayLabel).join('، ')}</td>
          <td style="text-align:center; white-space:nowrap">${formatTimeRange(a.start, a.end)}</td>
          <td style="text-align:center">${escapeHtml(a.room)}</td>
        </tr>`).join('')
      : `<tr><td colspan="4" style="text-align:center;color:#888;padding:8px">${t('officeEmpty')}</td></tr>`;

    const tableBase = `width:100%;border-collapse:collapse;font-family:${fontFamily};direction:${dir};font-size:10.5pt;table-layout:fixed;`;
    const thStyle = `background:#1b3a6b;color:#fff;padding:5px 8px;font-weight:700;border:1px solid #14305a;font-size:10.5pt;text-align:center;vertical-align:middle;`;

    const sep = `<span style="color:#c8a44a;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`;

    return `
<div style="width:${PRINT_WIDTH}px;background:#ffffff;padding:10px 16px 12px;box-sizing:border-box;direction:${dir};font-family:${fontFamily};color:#1a1f2e;">

  <div style="text-align:center;margin:0;line-height:1;">
    <img src="${LOGO_PATH}" alt="" style="height:100px;width:auto;max-width:165px;object-fit:contain;display:inline-block;margin-bottom:-8px;"
         onerror="this.style.display='none'" />
  </div>

  <div style="text-align:center;font-size:12pt;font-weight:800;color:#1b3a6b;line-height:1.1;margin:0 0 6px 0;">
    ${t('printUniversity')}
  </div>

      <div style="text-align:center;font-size:11pt;line-height:1.5;margin-bottom:2px;">
        <strong style="color:#1b3a6b;">${t('printCollege')}:</strong> ${escapeHtml(ac.collegeName)}${sep}<strong style="color:#1b3a6b;">${t('printDepartment')}:</strong> ${escapeHtml(ac.departmentName)}
      </div>

      <div style="text-align:center;font-size:11pt;line-height:1.5;margin-bottom:2px;">
        <strong style="color:#1b3a6b;">${t('printYear')}:</strong> ${escapeHtml(ac.academicYear)}${sep}<strong style="color:#1b3a6b;">${t('printSemester')}:</strong> ${escapeHtml(ac.semester)}
      </div>

      <div style="text-align:center;font-size:11pt;line-height:1.5;margin-bottom:8px;">
        <strong style="color:#1b3a6b;">${t('printFaculty')}:</strong> ${escapeHtml(ac.facultyName)}
      </div>

      <div style="text-align:center;font-size:12.5pt;font-weight:800;color:#1b3a6b;border-top:2px solid #c8a44a;border-bottom:2px solid #c8a44a;padding:4px 0;margin-bottom:8px;">
        ${t('pdfTitle')}
      </div>

      <div style="font-size:12pt;font-weight:800;color:#1b3a6b;margin:0 0 4px;padding-${isAr ? 'right' : 'left'}:8px;border-${isAr ? 'right' : 'left'}:4px solid #c8a44a;">
        ${t('lecturesTitle')}
      </div>
      <table style="${tableBase}">
        <colgroup>
          <col style="width:6%" />
          <col style="width:30%" />
          <col style="width:20%" />
          <col style="width:25%" />
          <col style="width:19%" />
        </colgroup>
        <thead>
          <tr>
            <th style="${thStyle}">${t('thNum')}</th>
            <th style="${thStyle}">${t('thCourse')}</th>
            <th style="${thStyle}">${t('thDay')}</th>
            <th style="${thStyle}">${t('thTime')}</th>
            <th style="${thStyle}">${t('thRoom')}</th>
          </tr>
        </thead>
        <tbody>${lectureRows}</tbody>
      </table>

      <div style="font-size:12pt;font-weight:800;color:#1b3a6b;margin:10px 0 4px;padding-${isAr ? 'right' : 'left'}:8px;border-${isAr ? 'right' : 'left'}:4px solid #c8a44a;">
        ${t('officeTitle')}
      </div>
      <table style="${tableBase}">
        <colgroup>
          <col style="width:8%" />
          <col style="width:29%" />
          <col style="width:34%" />
          <col style="width:29%" />
        </colgroup>
        <thead>
          <tr>
            <th style="${thStyle}">${t('thONum')}</th>
            <th style="${thStyle}">${t('thODay')}</th>
            <th style="${thStyle}">${t('thOTime')}</th>
            <th style="${thStyle}">${t('thORoom')}</th>
          </tr>
        </thead>
        <tbody>${officeRows}</tbody>
      </table>

    </div>`;
  }

  function exportToWord() {
    if (activities.length === 0) { showToast(t('msgNoData'), true); return; }

    try {
      if (typeof docx === 'undefined') { showToast(t('msgLibMissing'), true); return; }

      const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
              WidthType, AlignmentType, BorderStyle, ImageRun } = docx;

      const ac = getAcademicData();
      const isAr = currentLang === 'ar';
      const fontName = isAr ? 'Arial' : 'Calibri';
      const lectures = sortActivitiesByDay(activities.filter((a) => a.type === 'lecture'));
      const officeHours = sortActivitiesByDay(activities.filter((a) => a.type === 'office'));

      const borderDef = {
        top: { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E2' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E2' },
        left: { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E2' },
        right: { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E2' },
      };

      const children = [];

      function centeredPara(runs, opts) {
        opts = opts || {};
        return new Paragraph({
          alignment: AlignmentType.CENTER,
          bidirectional: isAr,
          spacing: { after: opts.after != null ? opts.after : 60, before: opts.before || 0 },
          children: runs,
        });
      }

      function run(text, size, opts) {
        opts = opts || {};
        return new TextRun({
          text: String(text || ''),
          font: fontName,
          size: size,
          bold: !!opts.bold,
          color: opts.color || '1A1F2E',
          rightToLeft: isAr,
        });
      }

      if (window.__logoBase64 && window.__logoDimensions) {
        try {
          const base64 = window.__logoBase64.split(',')[1];
          const binary = atob(base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

          const { w, h } = window.__logoDimensions;
          const maxW = 120, maxH = 80;
          let drawW = maxW, drawH = (h / w) * maxW;
          if (drawH > maxH) { drawH = maxH; drawW = (w / h) * maxH; }

          children.push(centeredPara([new ImageRun({
            data: bytes,
            transformation: { width: Math.round(drawW), height: Math.round(drawH) },
          })], { after: 40 }));
        } catch (e) { console.warn('logo embed error:', e); }
      }

      children.push(centeredPara([run(t('printUniversity'), 30, { bold: true, color: '1B3A6B' })], { after: 60 }));

      children.push(centeredPara([
        run(t('printCollege') + ': ', 22, { bold: true, color: '1B3A6B' }),
        run(ac.collegeName, 22),
        run('   |   ', 22, { color: 'C8A44A' }),
        run(t('printDepartment') + ': ', 22, { bold: true, color: '1B3A6B' }),
        run(ac.departmentName, 22),
      ], { after: 30 }));

      children.push(centeredPara([
        run(t('printYear') + ': ', 22, { bold: true, color: '1B3A6B' }),
        run(ac.academicYear, 22),
        run('   |   ', 22, { color: 'C8A44A' }),
        run(t('printSemester') + ': ', 22, { bold: true, color: '1B3A6B' }),
        run(ac.semester, 22),
      ], { after: 30 }));

      children.push(centeredPara([
        run(t('printFaculty') + ': ', 22, { bold: true, color: '1B3A6B' }),
        run(ac.facultyName, 22),
      ], { after: 160 }));

      children.push(centeredPara([
        run(t('wordTitle'), 26, { bold: true, color: '1B3A6B' }),
      ], { after: 160 }));

      function makeCell(text, opts) {
        opts = opts || {};
        return new TableCell({
          borders: borderDef,
          width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
          shading: opts.header ? { fill: '1B3A6B' } : undefined,
          verticalAlign: 'center',
          children: [new Paragraph({
            bidirectional: isAr,
            alignment: AlignmentType.CENTER,
            children: [new TextRun({
              text: String(text || ''),
              font: fontName,
              size: opts.header ? 22 : 22,
              bold: !!opts.header,
              color: opts.header ? 'FFFFFF' : '1A1F2E',
              rightToLeft: isAr,
            })],
          })],
        });
      }

      children.push(new Paragraph({
        alignment: isAr ? AlignmentType.RIGHT : AlignmentType.LEFT,
        bidirectional: isAr,
        spacing: { before: 60, after: 80 },
        children: [run(t('lecturesTitle'), 24, { bold: true, color: '1B3A6B' })],
      }));

      const lectureHeader = new TableRow({
        tableHeader: true,
        children: [
          makeCell(t('thNum'), { header: true, width: 6 }),
          makeCell(t('thCourse'), { header: true, width: 30 }),
          makeCell(t('thDay'), { header: true, width: 20 }),
          makeCell(t('thTime'), { header: true, width: 25 }),
          makeCell(t('thRoom'), { header: true, width: 19 }),
        ],
      });

      const lectureRows = lectures.map((a, i) => new TableRow({
        children: [
          makeCell(i + 1),
          makeCell(a.course),
          makeCell(a.days.map(getDayLabel).join('، ')),
          makeCell(formatTimeRange(a.start, a.end)),
          makeCell(a.room),
        ],
      }));

      children.push(new Table({
        visuallyRightToLeft: isAr,
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [lectureHeader, ...lectureRows],
      }));

      children.push(new Paragraph({
        alignment: isAr ? AlignmentType.RIGHT : AlignmentType.LEFT,
        bidirectional: isAr,
        spacing: { before: 220, after: 80 },
        children: [run(t('officeTitle'), 24, { bold: true, color: '1B3A6B' })],
      }));

      const officeHeader = new TableRow({
        tableHeader: true,
        children: [
          makeCell(t('thONum'), { header: true, width: 8 }),
          makeCell(t('thODay'), { header: true, width: 29 }),
          makeCell(t('thOTime'), { header: true, width: 34 }),
          makeCell(t('thORoom'), { header: true, width: 29 }),
        ],
      });

      const officeRows = officeHours.map((a, i) => new TableRow({
        children: [
          makeCell(i + 1),
          makeCell(a.days.map(getDayLabel).join('، ')),
          makeCell(formatTimeRange(a.start, a.end)),
          makeCell(a.room),
        ],
      }));

      children.push(new Table({
        visuallyRightToLeft: isAr,
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [officeHeader, ...officeRows],
      }));

      const doc = new Document({
        sections: [{
          properties: {
            page: {
              size: { orientation: 'landscape', width: 16838, height: 11906 },
              margin: { top: 560, right: 560, bottom: 560, left: 560 },
            },
          },
          children,
        }],
      });

      Packer.toBlob(doc).then((blob) => {
        const fname = isAr
          ? `جدول_المحاضرات_${ac.facultyName || 'عضو_الهيئة'}.docx`
          : `Schedule_${(ac.facultyName || 'Faculty').replace(/\s+/g, '_')}.docx`;
        saveAs(blob, fname);
      }).catch(() => showToast(t('msgExportError'), true));

    } catch (err) {
      console.error('Word error:', err);
      showToast(t('msgExportError'), true);
    }
  }

  function exportToPdf() {
    if (activities.length === 0) { showToast(t('msgNoData'), true); return; }

    if (typeof html2canvas === 'undefined' || !window.jspdf) {
      showToast(t('msgLibMissing'), true); return;
    }

    showToast(t('msgExporting'));

    el.printArea.innerHTML = buildPrintHTML();
    const target = el.printArea.firstElementChild;

    const imgs = el.printArea.querySelectorAll('img');
    const imgPromises = Array.from(imgs).map((img) => new Promise((resolve) => {
      if (img.complete) return resolve();
      img.onload = () => resolve();
      img.onerror = () => { img.style.display = 'none'; resolve(); };
      setTimeout(resolve, 2500);
    }));

    Promise.all(imgPromises)
      .then(() => {
        el.printArea.querySelectorAll('img').forEach((img) => {
          if (!img.naturalWidth) img.style.display = 'none';
        });
        return html2canvas(target, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          width: PRINT_WIDTH,
          windowWidth: PRINT_WIDTH,
        });
      })
      .then((canvas) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape',
          compress: true,
        });

        const pageW = 297;
        const pageH = 210;
        const margin = 6;
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;

        const imgW = canvas.width;
        const imgH = canvas.height;
        const ratio = imgH / imgW;
        const heightAtFullW = availW * ratio;

        if (heightAtFullW <= availH) {
          const drawW = availW;
          const drawH = heightAtFullW;
          const x = margin;
          const y = margin + (availH - drawH) / 2;
          pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', x, y, drawW, drawH);
        } else {
          const scaleDown = availH / heightAtFullW;
          if (scaleDown >= 0.75) {
            const drawW = availW * scaleDown;
            const drawH = availH;
            const x = (pageW - drawW) / 2;
            const y = margin;
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', x, y, drawW, drawH);
          } else {
            const pagesNeeded = Math.ceil(heightAtFullW / availH);
            const stripHeightPx = imgH / pagesNeeded;

            for (let i = 0; i < pagesNeeded; i++) {
              if (i > 0) pdf.addPage();

              const srcY = i * stripHeightPx;
              const srcH = Math.min(stripHeightPx, imgH - srcY);

              const stripCanvas = document.createElement('canvas');
              stripCanvas.width = imgW;
              stripCanvas.height = srcH;
              const ctx = stripCanvas.getContext('2d');
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, imgW, srcH);
              ctx.drawImage(canvas, 0, srcY, imgW, srcH, 0, 0, imgW, srcH);

              const drawH = (srcH / imgW) * availW;
              pdf.addImage(stripCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', margin, margin, availW, drawH);
            }
          }
        }

        const fname = currentLang === 'ar'
          ? `جدول_المحاضرات_${getAcademicData().facultyName || 'عضو_الهيئة'}.pdf`
          : `Schedule_${(getAcademicData().facultyName || 'Faculty').replace(/\s+/g, '_')}.pdf`;

        pdf.save(fname);
        el.printArea.innerHTML = '';
      })
      .catch((err) => {
        console.error('PDF error:', err);
        el.printArea.innerHTML = '';
        showToast(t('msgExportError'), true);
      });
  }

  function preloadLogoAsBase64() {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        window.__logoBase64 = canvas.toDataURL('image/png');
        window.__logoDimensions = { w: img.naturalWidth, h: img.naturalHeight };
      } catch (e) {}
    };
    img.src = LOGO_PATH;
  }

  el.langSelect.addEventListener('change', () => {
    applyLanguage(el.langSelect.value);
    saveState();
  });

  el.activityType.addEventListener('change', updateFormVisibility);
  el.addBtn.addEventListener('click', handleAddOrUpdate);
  el.cancelEditBtn.addEventListener('click', cancelEdit);

  el.lecturesBody.addEventListener('click', handleTableClick);
  el.officeBody.addEventListener('click', handleTableClick);

  function handleTableClick(e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (action === 'edit') startEdit(id);
    else if (action === 'delete') deleteActivity(id);
  }

  el.exportWordBtn.addEventListener('click', exportToWord);
  el.exportPdfBtn.addEventListener('click', exportToPdf);

  el.clearAllBtn.addEventListener('click', () => {
    showConfirm(t('confirmClear'), () => {
      activities = [];
      editingId = null;
      clearState();
      el.facultyName.value = '';
      el.collegeName.value = '';
      el.departmentName.value = '';
      el.semester.value = '';
      el.academicYear.value = '';
      resetActivityForm();
      renderTables();
      cancelEdit();
      showToast(t('msgCleared'));
    });
  });

  ['facultyName', 'collegeName', 'departmentName', 'academicYear'].forEach((id) => {
    document.getElementById(id).addEventListener('input', saveState);
  });
  el.semester.addEventListener('change', saveState);

  function init() {
    preloadLogoAsBase64();

    const saved = loadState();
    if (saved) {
      if (saved.lang && (saved.lang === 'ar' || saved.lang === 'en')) {
        currentLang = saved.lang;
        el.langSelect.value = saved.lang;
      }
      if (saved.academic) {
        el.facultyName.value = saved.academic.facultyName || '';
        el.collegeName.value = saved.academic.collegeName || '';
        el.departmentName.value = saved.academic.departmentName || '';
        el.semester.value = saved.academic.semester || '';
        el.academicYear.value = saved.academic.academicYear || '';
      }
      if (Array.isArray(saved.activities)) {
        activities = saved.activities.filter((a) => a && a.id && a.type && Array.isArray(a.days));
      }
    }

    applyLanguage(currentLang);
    updateFormVisibility();
    renderTables();
    el.universityName.value = t('universityValue');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
