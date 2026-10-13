/* =============================================
   جدولي الجامعي | My University Schedule
   المنطق الرئيسي: إدارة البيانات، اللغة،
   الحفظ المحلي، التصدير إلى Word و PDF
   ============================================= */

(function () {
  'use strict';

  /* =========================================
     1) الثوابت والترجمات
     ========================================= */

  const STORAGE_KEY = 'myUniversitySchedule_v1';
  const LOGO_PATH = 'assets/philadelphia-university-logo.png';

  const DAY_KEYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];

  const DAY_ORDER = {
    sat: 0, sun: 1, mon: 2, tue: 3, wed: 4, thu: 5
  };

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
      collegePlaceholder: 'مثال: كلية الهندسة',
      departmentName: 'اسم القسم',
      departmentPlaceholder: 'مثال: قسم هندسة الحاسوب',
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
      daySat: 'السبت',
      daySun: 'الأحد',
      dayMon: 'الاثنين',
      dayTue: 'الثلاثاء',
      dayWed: 'الأربعاء',
      dayThu: 'الخميس',
      labelPeriod: 'الفترة',
      periodAm: 'ص - صباحًا',
      periodPm: 'م - مساءً',
      labelStartTime: 'وقت البداية (اختياري)',
      labelEndTime: 'وقت النهاية (اختياري)',
      addBtn: 'إضافة إلى الجدول',
      saveEditBtn: 'حفظ التعديلات',
      cancelEditBtn: 'إلغاء التعديل',
      editHint: 'وضع التعديل — عدّل البيانات ثم اضغط «حفظ التعديلات»',
      tablesTitle: 'الجداول',
      lecturesTitle: 'جدول المحاضرات',
      officeTitle: 'جدول الساعات المكتبية',
      thNum: '#',
      thCourse: 'اسم المساق',
      thDay: 'اليوم',
      thPeriod: 'الفترة',
      thTime: 'الوقت',
      thRoom: 'القاعة',
      thActions: 'الإجراءات',
      thONum: '#',
      thODay: 'اليوم',
      thOPeriod: 'الفترة',
      thOTime: 'الوقت',
      thORoom: 'المكتب',
      thOActions: 'الإجراءات',
      lecturesEmpty: 'لا توجد محاضرات بعد. أضف أول محاضرة من النموذج أعلاه.',
      officeEmpty: 'لا توجد ساعات مكتبية بعد. أضف أول ساعة من النموذج أعلاه.',
      exportTitle: 'التصدير',
      exportWordBtn: 'تصدير إلى Word',
      exportPdfBtn: 'تصدير إلى PDF',
      clearAllBtn: 'مسح جميع البيانات',
      storageNote: 'يتم حفظ البيانات محليًا في هذا المتصفح فقط. لا تتم المزامنة بين الأجهزة.',
      editBtn: 'تعديل',
      delBtn: 'حذف',
      confirmDelete: 'هل أنت متأكد من حذف هذا النشاط؟',
      confirmClear: 'هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.',
      confirmYes: 'نعم، تأكيد',
      confirmNo: 'إلغاء',
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
      msgTooManyForPdf: 'عدد الأنشطة كبير جدًا بحيث لا يمكن عرضها بصورة مقروءة في صفحة A4 أفقية واحدة. يرجى تقليل عدد الأنشطة أو تقسيمها إلى فصول مختلفة.',
      pdfTitle: 'جدول المحاضرات والساعات المكتبية',
      wordTitle: 'جدول المحاضرات والساعات المكتبية',
      printFaculty: 'عضو هيئة التدريس',
      printCollege: 'الكلية',
      printDepartment: 'القسم',
      printSemester: 'الفصل الدراسي',
      printYear: 'العام الدراسي',
      printUniversity: 'جامعة فيلادلفيا',
      periodLabelAm: 'صباحًا',
      periodLabelPm: 'مساءً',
      timeFrom: 'من',
      timeTo: 'إلى',
      notSpecified: '—',
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
      collegePlaceholder: 'e.g., College of Engineering',
      departmentName: 'Department',
      departmentPlaceholder: 'e.g., Computer Engineering Dept.',
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
      daySat: 'Saturday',
      daySun: 'Sunday',
      dayMon: 'Monday',
      dayTue: 'Tuesday',
      dayWed: 'Wednesday',
      dayThu: 'Thursday',
      labelPeriod: 'Period',
      periodAm: 'AM',
      periodPm: 'PM',
      labelStartTime: 'Start Time (optional)',
      labelEndTime: 'End Time (optional)',
      addBtn: 'Add to Schedule',
      saveEditBtn: 'Save Changes',
      cancelEditBtn: 'Cancel Edit',
      editHint: 'Edit mode — modify the data then click “Save Changes”',
      tablesTitle: 'Schedules',
      lecturesTitle: 'Lectures Schedule',
      officeTitle: 'Office Hours Schedule',
      thNum: '#',
      thCourse: 'Course Name',
      thDay: 'Day',
      thPeriod: 'Period',
      thTime: 'Time',
      thRoom: 'Room',
      thActions: 'Actions',
      thONum: '#',
      thODay: 'Day',
      thOPeriod: 'Period',
      thOTime: 'Time',
      thORoom: 'Office',
      thOActions: 'Actions',
      lecturesEmpty: 'No lectures yet. Add your first lecture from the form above.',
      officeEmpty: 'No office hours yet. Add your first office hour from the form above.',
      exportTitle: 'Export',
      exportWordBtn: 'Export to Word',
      exportPdfBtn: 'Export to PDF',
      clearAllBtn: 'Clear All Data',
      storageNote: 'Data is saved locally in this browser only. It is not synced across devices.',
      editBtn: 'Edit',
      delBtn: 'Delete',
      confirmDelete: 'Are you sure you want to delete this activity?',
      confirmClear: 'Are you sure you want to clear all data? This action cannot be undone.',
      confirmYes: 'Yes, Confirm',
      confirmNo: 'Cancel',
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
      msgTooManyForPdf: 'Too many activities to fit legibly on a single A4 landscape page. Please reduce the number of activities or split them across semesters.',
      pdfTitle: 'Lectures and Office Hours Schedule',
      wordTitle: 'Lectures and Office Hours Schedule',
      printFaculty: 'Faculty Member',
      printCollege: 'College',
      printDepartment: 'Department',
      printSemester: 'Semester',
      printYear: 'Academic Year',
      printUniversity: 'Philadelphia University',
      periodLabelAm: 'AM',
      periodLabelPm: 'PM',
      timeFrom: 'From',
      timeTo: 'To',
      notSpecified: '—',
    }
  };

  /* =========================================
     2) الحالة
     ========================================= */

  let currentLang = 'ar';
  let activities = [];       // مصفوفة الأنشطة
  let editingId = null;      // معرّف النشاط قيد التعديل

  /* =========================================
     3) عناصر DOM
     ========================================= */

  const $ = (id) => document.getElementById(id);

  const el = {
    langSelect: $('langSelect'),
    appTitle: $('appTitle'),
    appSubtitle: $('appSubtitle'),
    langLabel: $('langLabel'),

    // بيانات أكاديمية
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

    // نشاط
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
    labelPeriod: $('labelPeriod'),
    periodAm: $('periodAm'),
    periodPm: $('periodPm'),
    labelStartTime: $('labelStartTime'),
    startTime: $('startTime'),
    labelEndTime: $('labelEndTime'),
    endTime: $('endTime'),
    addBtn: $('addBtn'),
    cancelEditBtn: $('cancelEditBtn'),
    editHint: $('editHint'),

    // الجداول
    tablesTitle: $('tablesTitle'),
    lecturesTitle: $('lecturesTitle'),
    officeTitle: $('officeTitle'),
    thNum: $('thNum'),
    thCourse: $('thCourse'),
    thDay: $('thDay'),
    thPeriod: $('thPeriod'),
    thTime: $('thTime'),
    thRoom: $('thRoom'),
    thActions: $('thActions'),
    thONum: $('thONum'),
    thODay: $('thODay'),
    thOPeriod: $('thOPeriod'),
    thOTime: $('thOTime'),
    thORoom: $('thORoom'),
    thOActions: $('thOActions'),
    lecturesBody: $('lecturesBody'),
    officeBody: $('officeBody'),
    lecturesEmpty: $('lecturesEmpty'),
    officeEmpty: $('officeEmpty'),

    // تصدير
    exportTitle: $('exportTitle'),
    exportWordBtn: $('exportWordBtn'),
    exportPdfBtn: $('exportPdfBtn'),
    clearAllBtn: $('clearAllBtn'),
    storageNote: $('storageNote'),

    // نافذة تأكيد
    confirmOverlay: $('confirmOverlay'),
    confirmMessage: $('confirmMessage'),
    confirmYes: $('confirmYes'),
    confirmNo: $('confirmNo'),

    // توست
    toast: $('toast'),

    // منطقة الطباعة
    printArea: $('printArea'),
  };

  /* =========================================
     4) دوال مساعدة
     ========================================= */

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || key;
  }

  function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getSelectedDays() {
    const checked = el.daysGrid.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checked).map((cb) => cb.value);
  }

  function getSelectedPeriod() {
    const radio = document.querySelector('input[name="period"]:checked');
    return radio ? radio.value : 'am';
  }

  function getSemesterLabel(value) {
    const map = {
      first: t('semFirst'),
      second: t('semSecond'),
      summer: t('semSummer'),
    };
    return map[value] || value;
  }

  function getDayLabel(key) {
    const map = {
      sat: t('daySat'),
      sun: t('daySun'),
      mon: t('dayMon'),
      tue: t('dayTue'),
      wed: t('dayWed'),
      thu: t('dayThu'),
    };
    return map[key] || key;
  }

  function getPeriodLabel(period) {
    return period === 'am' ? t('periodLabelAm') : t('periodLabelPm');
  }

  function getPeriodShort(period) {
    return period === 'am' ? t('periodAm') : t('periodPm');
  }

  function formatTimeRange(start, end) {
    if (!start && !end) return t('notSpecified');
    if (start && end) return `${start} - ${end}`;
    if (start) return `${t('timeFrom')} ${start}`;
    return `${t('timeTo')} ${end}`;
  }

  function sortActivitiesByDay(list) {
    return list.slice().sort((a, b) => {
      const dayA = Math.min(...a.days.map((d) => DAY_ORDER[d] ?? 99));
      const dayB = Math.min(...b.days.map((d) => DAY_ORDER[d] ?? 99));
      return dayA - dayB;
    });
  }

  /* =========================================
     5) تطبيق اللغة
     ========================================= */

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    const dir = dict.dir;

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.classList.toggle('lang-en', lang === 'en');

    // رأس الصفحة
    el.appTitle.textContent = t('appTitle');
    el.appSubtitle.textContent = t('appSubtitle');
    el.langLabel.textContent = t('langLabel');

    // بيانات أكاديمية
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

    // نشاط
    el.activityTitle.textContent = t('activityTitle');
    el.labelActivityType.textContent = t('activityType');
    el.typeLecture.textContent = t('typeLecture');
    el.typeOffice.textContent = t('typeOffice');
    el.labelCourseName.textContent = t('courseName');
    el.courseName.placeholder = t('coursePlaceholder');
    el.labelRoom.textContent = t('roomNumber');
    el.roomNumber.placeholder = t('roomPlaceholder');
    el.labelDays.textContent = t('labelDays');
    el.labelPeriod.textContent = t('labelPeriod');
    el.periodAm.textContent = t('periodAm');
    el.periodPm.textContent = t('periodPm');
    el.labelStartTime.textContent = t('labelStartTime');
    el.labelEndTime.textContent = t('labelEndTime');
    el.addBtn.textContent = editingId ? t('saveEditBtn') : t('addBtn');
    el.cancelEditBtn.textContent = t('cancelEditBtn');
    el.editHint.textContent = t('editHint');

    // أيام
    const dayMap = {
      sat: 'daySat', sun: 'daySun', mon: 'dayMon',
      tue: 'dayTue', wed: 'dayWed', thu: 'dayThu',
    };
    DAY_KEYS.forEach((key) => {
      const span = document.getElementById('day' + key.charAt(0).toUpperCase() + key.slice(1));
      if (span) span.textContent = t(dayMap[key]);
    });

    // جداول
    el.tablesTitle.textContent = t('tablesTitle');
    el.lecturesTitle.textContent = t('lecturesTitle');
    el.officeTitle.textContent = t('officeTitle');
    el.thNum.textContent = t('thNum');
    el.thCourse.textContent = t('thCourse');
    el.thDay.textContent = t('thDay');
    el.thPeriod.textContent = t('thPeriod');
    el.thTime.textContent = t('thTime');
    el.thRoom.textContent = t('thRoom');
    el.thActions.textContent = t('thActions');
    el.thONum.textContent = t('thONum');
    el.thODay.textContent = t('thODay');
    el.thOPeriod.textContent = t('thOPeriod');
    el.thOTime.textContent = t('thOTime');
    el.thORoom.textContent = t('thORoom');
    el.thOActions.textContent = t('thOActions');
    el.lecturesEmpty.textContent = t('lecturesEmpty');
    el.officeEmpty.textContent = t('officeEmpty');

    // تصدير
    el.exportTitle.textContent = t('exportTitle');
    el.exportWordBtn.textContent = t('exportWordBtn');
    el.exportPdfBtn.textContent = t('exportPdfBtn');
    el.clearAllBtn.textContent = t('clearAllBtn');
    el.storageNote.textContent = t('storageNote');

    // نافذة تأكيد
    el.confirmYes.textContent = t('confirmYes');
    el.confirmNo.textContent = t('confirmNo');

    // إعادة رسم الجداول لترجمة المحتوى
    renderTables();
  }

  /* =========================================
     6) التخزين المحلي
     ========================================= */

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
    } catch (err) {
      console.warn('فشل الحفظ في localStorage:', err);
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.warn('فشل قراءة localStorage:', err);
      return null;
    }
  }

  function clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('فشل مسح localStorage:', err);
    }
  }

  /* =========================================
     7) رسم الجداول
     ========================================= */

  function renderTables() {
    const lectures = sortActivitiesByDay(activities.filter((a) => a.type === 'lecture'));
    const officeHours = sortActivitiesByDay(activities.filter((a) => a.type === 'office'));

    // ---- المحاضرات ----
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
          <td>${getPeriodShort(act.period)}</td>
          <td>${formatTimeRange(act.start, act.end)}</td>
          <td>${escapeHtml(act.room)}</td>
          <td>
            <div class="actions">
              <button class="btn btn-sm btn-edit" data-action="edit" data-id="${act.id}">${t('editBtn')}</button>
              <button class="btn btn-sm btn-del" data-action="delete" data-id="${act.id}">${t('delBtn')}</button>
            </div>
          </td>
        `;
        el.lecturesBody.appendChild(tr);
      });
    }

    // ---- الساعات المكتبية ----
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
          <td>${getPeriodShort(act.period)}</td>
          <td>${formatTimeRange(act.start, act.end)}</td>
          <td>${escapeHtml(act.room)}</td>
          <td>
            <div class="actions">
              <button class="btn btn-sm btn-edit" data-action="edit" data-id="${act.id}">${t('editBtn')}</button>
              <button class="btn btn-sm btn-del" data-action="delete" data-id="${act.id}">${t('delBtn')}</button>
            </div>
          </td>
        `;
        el.officeBody.appendChild(tr);
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* =========================================
     8) نموذج الإضافة / التعديل
     ========================================= */

  function resetActivityForm(keepType) {
    if (!keepType) {
      el.activityType.value = 'lecture';
    }
    el.courseName.value = '';
    el.roomNumber.value = '';
    el.startTime.value = '';
    el.endTime.value = '';
    document.querySelectorAll('#daysGrid input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    document.querySelector('input[name="period"][value="am"]').checked = true;
    updateFormVisibility();
  }

  function updateFormVisibility() {
    // إظهار/إخفاء حقل اسم المساق حسب النوع
    const isLecture = el.activityType.value === 'lecture';
    el.labelCourseName.parentElement.style.display = isLecture ? '' : 'none';
    // تغيير التسمية للمكان
    el.labelRoom.textContent = isLecture ? t('roomNumber') : t('roomNumber');
  }

  function validateForm() {
    const facultyName = el.facultyName.value.trim();
    const days = getSelectedDays();
    const type = el.activityType.value;

    if (!facultyName || days.length === 0) {
      showToast(t('msgFillRequired'), true);
      return false;
    }

    if (type === 'lecture' && !el.courseName.value.trim()) {
      showToast(t('msgCourseRequired'), true);
      return false;
    }

    if (!el.roomNumber.value.trim()) {
      showToast(t('msgRoomRequired'), true);
      return false;
    }

    const start = el.startTime.value;
    const end = el.endTime.value;
    if (start && end && start >= end) {
      showToast(t('msgTimeInvalid'), true);
      return false;
    }

    return true;
  }

  function buildActivityFromForm() {
    return {
      id: editingId || genId(),
      type: el.activityType.value,
      course: el.activityType.value === 'lecture' ? el.courseName.value.trim() : '',
      room: el.roomNumber.value.trim(),
      days: getSelectedDays(),
      period: getSelectedPeriod(),
      start: el.startTime.value,
      end: el.endTime.value,
    };
  }

  function isDuplicate(newAct) {
    return activities.some((a) => {
      if (a.id === newAct.id) return false; // تجاهل النشاط قيد التعديل
      if (a.type !== newAct.type) return false;
      if (a.course !== newAct.course) return false;
      if (a.room !== newAct.room) return false;
      if (a.period !== newAct.period) return false;
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

    if (isDuplicate(act)) {
      showToast(t('msgDuplicate'), true);
      return;
    }

    if (editingId) {
      // تعديل
      const idx = activities.findIndex((a) => a.id === editingId);
      if (idx !== -1) {
        activities[idx] = act;
      }
      editingId = null;
      el.addBtn.textContent = t('addBtn');
      el.cancelEditBtn.classList.add('hidden');
      el.editHint.classList.add('hidden');
      showToast(t('msgUpdated'));
    } else {
      // إضافة جديدة
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

    const periodRadio = document.querySelector(`input[name="period"][value="${act.period}"]`);
    if (periodRadio) periodRadio.checked = true;

    updateFormVisibility();

    el.addBtn.textContent = t('saveEditBtn');
    el.cancelEditBtn.classList.remove('hidden');
    el.editHint.classList.remove('hidden');

    // التمرير إلى النموذج
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
    showConfirm(`${t('confirmDelete')}\n\n«${name}»`, () => {
      activities = activities.filter((a) => a.id !== id);
      if (editingId === id) cancelEdit();
      renderTables();
      saveState();
      showToast(t('msgDeleted'));
    });
  }

  /* =========================================
     9) نافذة التأكيد
     ========================================= */

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

  /* =========================================
     10) التوست
     ========================================= */

  let toastTimer = null;

  function showToast(msg, isError) {
    clearTimeout(toastTimer);
    el.toast.textContent = msg;
    el.toast.classList.toggle('error', !!isError);
    el.toast.classList.remove('hidden');
    // إجبار إعادة الرسم
    void el.toast.offsetWidth;
    el.toast.classList.add('show');

    toastTimer = setTimeout(() => {
      el.toast.classList.remove('show');
      setTimeout(() => el.toast.classList.add('hidden'), 350);
    }, 2800);
  }

  /* =========================================
     11) بناء HTML للطباعة والتصدير
     ========================================= */

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

    // صفوف جدول المحاضرات
    const lectureRows = lectures.length
      ? lectures.map((a, i) => `
        <tr>
          <td style="text-align:center">${i + 1}</td>
          <td>${escapeHtml(a.course)}</td>
          <td>${a.days.map(getDayLabel).join('، ')}</td>
          <td>${getPeriodLabel(a.period)}</td>
          <td>${formatTimeRange(a.start, a.end)}</td>
          <td>${escapeHtml(a.room)}</td>
        </tr>`).join('')
      : `<tr><td colspan="6" style="text-align:center;color:#888">${t('lecturesEmpty')}</td></tr>`;

    // صفوف جدول الساعات المكتبية
    const officeRows = officeHours.length
      ? officeHours.map((a, i) => `
        <tr>
          <td style="text-align:center">${i + 1}</td>
          <td>${a.days.map(getDayLabel).join('، ')}</td>
          <td>${getPeriodLabel(a.period)}</td>
          <td>${formatTimeRange(a.start, a.end)}</td>
          <td>${escapeHtml(a.room)}</td>
        </tr>`).join('')
      : `<tr><td colspan="5" style="text-align:center;color:#888">${t('officeEmpty')}</td></tr>`;

    const headerStyle = `
      font-family: ${fontFamily};
      direction: ${dir};
      text-align: ${isAr ? 'right' : 'left'};
    `;

    const tableStyle = `
      width:100%; border-collapse:collapse; margin-bottom:14px;
      font-family: ${fontFamily}; direction: ${dir};
    `;

    const thStyle = `
      background:#1b3a6b; color:#fff; padding:7px 8px; font-size:11pt;
      border:1px solid #1b3a6b; text-align:${isAr ? 'right' : 'left'};
    `;

    const tdStyle = `
      padding:6px 8px; border:1px solid #ccd4e0; font-size:10.5pt;
      text-align:${isAr ? 'right' : 'left'};
    `;

    // رأس أكاديمي
    const logoHtml = `
      <div style="text-align:center; margin-bottom:8px;">
        <img src="${LOGO_PATH}" alt="" style="height:70px; object-fit:contain;"
             onerror="this.style.display='none'" />
      </div>`;

    const infoHtml = `
      <div style="${headerStyle} font-size:11pt; line-height:1.7; margin-bottom:10px;">
        <div style="font-size:15pt; font-weight:800; color:#1b3a6b; margin-bottom:4px;">
          ${t('printUniversity')}
        </div>
        <div><strong>${t('printFaculty')}:</strong> ${escapeHtml(ac.facultyName)}</div>
        <div><strong>${t('printCollege')}:</strong> ${escapeHtml(ac.collegeName)}
             &nbsp;&nbsp;|&nbsp;&nbsp;
             <strong>${t('printDepartment')}:</strong> ${escapeHtml(ac.departmentName)}</div>
        <div><strong>${t('printSemester')}:</strong> ${escapeHtml(ac.semester)}
             &nbsp;&nbsp;|&nbsp;&nbsp;
             <strong>${t('printYear')}:</strong> ${escapeHtml(ac.academicYear)}</div>
      </div>`;

    const titleHtml = `
      <h2 style="${headerStyle} text-align:center; font-size:13pt; font-weight:800;
                  color:#1b3a6b; margin:6px 0 12px; border-bottom:2px solid #c8a44a;
                  padding-bottom:6px;">
        ${t('pdfTitle')}
      </h2>`;

    const lecturesTable = `
      <h3 style="${headerStyle} font-size:11.5pt; font-weight:700; color:#1b3a6b; margin:10px 0 5px;">
        ${t('lecturesTitle')}
      </h3>
      <table style="${tableStyle}">
        <thead>
          <tr>
            <th style="${thStyle} width:5%">${t('thNum')}</th>
            <th style="${thStyle} width:22%">${t('thCourse')}</th>
            <th style="${thStyle} width:16%">${t('thDay')}</th>
            <th style="${thStyle} width:13%">${t('thPeriod')}</th>
            <th style="${thStyle} width:22%">${t('thTime')}</th>
            <th style="${thStyle} width:22%">${t('thRoom')}</th>
          </tr>
        </thead>
        <tbody>${lectureRows}</tbody>
      </table>`;

    const officeTable = `
      <h3 style="${headerStyle} font-size:11.5pt; font-weight:700; color:#1b3a6b; margin:10px 0 5px;">
        ${t('officeTitle')}
      </h3>
      <table style="${tableStyle}">
        <thead>
          <tr>
            <th style="${thStyle} width:6%">${t('thONum')}</th>
            <th style="${thStyle} width:22%">${t('thODay')}</th>
            <th style="${thStyle} width:18%">${t('thOPeriod')}</th>
            <th style="${thStyle} width:28%">${t('thOTime')}</th>
            <th style="${thStyle} width:26%">${t('thORoom')}</th>
          </tr>
        </thead>
        <tbody>${officeRows}</tbody>
      </table>`;

    return `
      <div style="width:1050px; margin:0 auto; padding:28px 30px; background:#fff;
                  direction:${dir}; font-family:${fontFamily};">
        ${logoHtml}
        ${infoHtml}
        ${titleHtml}
        ${lecturesTable}
        ${officeTable}
      </div>`;
  }

  /* =========================================
     12) تصدير Word
     ========================================= */

  function exportToWord() {
    if (activities.length === 0) {
      showToast(t('msgNoData'), true);
      return;
    }

    try {
      if (typeof docx === 'undefined') {
        showToast('مكتبة Word غير محملة. تحقق من الاتصال بالإنترنت.', true);
        return;
      }

      const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
              WidthType, AlignmentType, BorderStyle, ImageRun, HeadingLevel } = docx;

      const ac = getAcademicData();
      const isAr = currentLang === 'ar';
      const dir = isAr ? 'rtl' : 'ltr';
      const fontName = isAr ? 'Tajawal' : 'Calibri';

      const lectures = sortActivitiesByDay(activities.filter((a) => a.type === 'lecture'));
      const officeHours = sortActivitiesByDay(activities.filter((a) => a.type === 'office'));

      const borderDef = {
        top: { style: BorderStyle.SINGLE, size: 4, color: 'CCD4E0' },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCD4E0' },
        left: { style: BorderStyle.SINGLE, size: 4, color: 'CCD4E0' },
        right: { style: BorderStyle.SINGLE, size: 4, color: 'CCD4E0' },
      };

      const children = [];

      // ---- محاولة إدراج الشعار ----
      // سنستخدم صورة عبر fetch (إن وجدت)
      // في DOCX نحتاج بيانات الصورة؛ إذا لم تتوفر نتجاهل الشعار بسلاسة
      // سنجرب إدراج الشعار لاحقًا بشكل غير متزامن؛ لكن DOCX يتطلب بناءً متزامنًا.
      // الحل: نستخدم صورة base64 محمّلة مسبقًا.
      if (window.__logoBase64) {
        try {
          const base64 = window.__logoBase64.split(',')[1];
          const binary = atob(base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

          children.push(new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: bytes,
                transformation: { width: 130, height: 90 },
              }),
            ],
          }));
        } catch (e) {
          console.warn('تعذر إدراج الشعار في Word:', e);
        }
      }

      // ---- معلومات أكاديمية ----
      const infoLines = [
        t('printUniversity'),
        `${t('printFaculty')}: ${ac.facultyName}`,
        `${t('printCollege')}: ${ac.collegeName}`,
        `${t('printDepartment')}: ${ac.departmentName}`,
        `${t('printSemester')}: ${ac.semester}`,
        `${t('printYear')}: ${ac.academicYear}`,
      ];

      infoLines.forEach((line, i) => {
        children.push(new Paragraph({
          alignment: isAr ? AlignmentType.RIGHT : AlignmentType.LEFT,
          spacing: { after: i === infoLines.length - 1 ? 200 : 40 },
          children: [
            new TextRun({
              text: line,
              font: fontName,
              size: i === 0 ? 32 : 22,
              bold: i === 0,
              color: i === 0 ? '1B3A6B' : '1A1F2E',
            }),
          ],
        }));
      });

      // ---- عنوان الجدول ----
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 200 },
        children: [
          new TextRun({
            text: t('wordTitle'),
            font: fontName,
            size: 26,
            bold: true,
            color: '1B3A6B',
          }),
        ],
      }));

      // ---- دالة إنشاء خلية ----
      function makeCell(text, opts) {
        opts = opts || {};
        return new TableCell({
          borders: borderDef,
          width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
          shading: opts.header ? { fill: '1B3A6B' } : undefined,
          children: [
            new Paragraph({
              alignment: opts.center
                ? AlignmentType.CENTER
                : (isAr ? AlignmentType.RIGHT : AlignmentType.LEFT),
              children: [
                new TextRun({
                  text: String(text || ''),
                  font: fontName,
                  size: opts.header ? 20 : 19,
                  bold: !!opts.header,
                  color: opts.header ? 'FFFFFF' : '1A1F2E',
                }),
              ],
            }),
          ],
        });
      }

      // ---- جدول المحاضرات ----
      children.push(new Paragraph({
        alignment: isAr ? AlignmentType.RIGHT : AlignmentType.LEFT,
        spacing: { before: 100, after: 80 },
        children: [new TextRun({ text: t('lecturesTitle'), font: fontName, size: 24, bold: true, color: '1B3A6B' })],
      }));

      const lectureHeader = new TableRow({
        tableHeader: true,
        children: [
          makeCell(t('thNum'), { header: true, center: true, width: 6 }),
          makeCell(t('thCourse'), { header: true, width: 24 }),
          makeCell(t('thDay'), { header: true, width: 18 }),
          makeCell(t('thPeriod'), { header: true, center: true, width: 14 }),
          makeCell(t('thTime'), { header: true, center: true, width: 20 }),
          makeCell(t('thRoom'), { header: true, center: true, width: 18 }),
        ],
      });

      const lectureRows = lectures.map((a, i) => new TableRow({
        children: [
          makeCell(i + 1, { center: true }),
          makeCell(a.course),
          makeCell(a.days.map(getDayLabel).join('، ')),
          makeCell(getPeriodLabel(a.period), { center: true }),
          makeCell(formatTimeRange(a.start, a.end), { center: true }),
          makeCell(a.room, { center: true }),
        ],
      }));

      children.push(new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [lectureHeader, ...lectureRows],
      }));

      // ---- جدول الساعات المكتبية ----
      children.push(new Paragraph({
        alignment: isAr ? AlignmentType.RIGHT : AlignmentType.LEFT,
        spacing: { before: 260, after: 80 },
        children: [new TextRun({ text: t('officeTitle'), font: fontName, size: 24, bold: true, color: '1B3A6B' })],
      }));

      const officeHeader = new TableRow({
        tableHeader: true,
        children: [
          makeCell(t('thONum'), { header: true, center: true, width: 7 }),
          makeCell(t('thODay'), { header: true, width: 24 }),
          makeCell(t('thOPeriod'), { header: true, center: true, width: 18 }),
          makeCell(t('thOTime'), { header: true, center: true, width: 27 }),
          makeCell(t('thORoom'), { header: true, center: true, width: 24 }),
        ],
      });

      const officeRows = officeHours.map((a, i) => new TableRow({
        children: [
          makeCell(i + 1, { center: true }),
          makeCell(a.days.map(getDayLabel).join('، ')),
          makeCell(getPeriodLabel(a.period), { center: true }),
          makeCell(formatTimeRange(a.start, a.end), { center: true }),
          makeCell(a.room, { center: true }),
        ],
      }));

      children.push(new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [officeHeader, ...officeRows],
      }));

      // ---- إنشاء المستند ----
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              size: {
                orientation: 'landscape',
                width: 16838,  // A4 landscape width in twips
                height: 11906,
              },
              margin: { top: 720, right: 720, bottom: 720, left: 720 },
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
        showToast(t('msgExporting'));
      }).catch((err) => {
        console.error('DOCX error:', err);
        showToast(t('msgExportError'), true);
      });

    } catch (err) {
      console.error('Word export error:', err);
      showToast(t('msgExportError'), true);
    }
  }

  /* =========================================
     13) تصدير PDF
     ========================================= */

  function exportToPdf() {
    if (activities.length === 0) {
      showToast(t('msgNoData'), true);
      return;
    }

    const total = activities.length;
    // حد أقصى تقديري للأنشطة التي يمكن عرضها بوضوح في صفحة واحدة
    const MAX_FOR_ONE_PAGE = 28;
    if (total > MAX_FOR_ONE_PAGE) {
      showToast(t('msgTooManyForPdf'), true);
      // نستمر بالتصدير لكن مع تحذير
    }

    try {
      showToast(t('msgExporting'));

      const html = buildPrintHTML();

      // وضع المحتوى في منطقة الطباعة
      el.printArea.innerHTML = html;

      // انتظار تحميل الصور (الشعار)
      const imgs = el.printArea.querySelectorAll('img');
      const imgPromises = Array.from(imgs).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) return resolve();
          img.onload = () => resolve();
          img.onerror = () => {
            img.style.display = 'none';
            resolve();
          };
          setTimeout(resolve, 3000); // مهلة قصوى
        });
      });

      Promise.all(imgPromises).then(() => {
        // إخفاء الصور المكسورة
        el.printArea.querySelectorAll('img').forEach((img) => {
          if (!img.naturalWidth) img.style.display = 'none';
        });

        const opt = {
          margin: [6, 8, 6, 8], // [top, right, bottom, left] مم
          filename: currentLang === 'ar'
            ? `جدول_المحاضرات_${getAcademicData().facultyName || 'عضو_الهيئة'}.pdf`
            : `Schedule_${(getAcademicData().facultyName || 'Faculty').replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            letterRendering: true,
            logging: false,
            backgroundColor: '#ffffff',
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
            compress: true,
          },
          pagebreak: { mode: ['css', 'legacy'] },
        };

        html2pdf()
          .set(opt)
          .from(el.printArea.firstElementChild)
          .save()
          .then(() => {
            el.printArea.innerHTML = '';
          })
          .catch((err) => {
            console.error('PDF error:', err);
            el.printArea.innerHTML = '';
            showToast(t('msgExportError'), true);
          });
      });

    } catch (err) {
      console.error('PDF export error:', err);
      showToast(t('msgExportError'), true);
    }
  }

  /* =========================================
     14) محاولة تحميل الشعار كـ Base64
     ========================================= */

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
      } catch (e) {
        console.warn('تعذر تحويل الشعار إلى Base64:', e);
      }
    };
    img.onerror = () => {
      // لا شعار — نتجاهل بصمت
      console.info('شعار الجامعة غير موجود في assets/. سيُعرض اسم الجامعة فقط.');
    };
    img.src = LOGO_PATH;
  }

  /* =========================================
     15) المستمعون (Event Listeners)
     ========================================= */

  // تبديل اللغة
  el.langSelect.addEventListener('change', () => {
    applyLanguage(el.langSelect.value);
    saveState();
  });

  // تغيير نوع النشاط
  el.activityType.addEventListener('change', updateFormVisibility);

  // زر الإضافة / الحفظ
  el.addBtn.addEventListener('click', handleAddOrUpdate);

  // زر إلغاء التعديل
  el.cancelEditBtn.addEventListener('click', cancelEdit);

  // أزرار الجداول (تعديل / حذف) — Event Delegation
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

  // تصدير Word
  el.exportWordBtn.addEventListener('click', exportToWord);

  // تصدير PDF
  el.exportPdfBtn.addEventListener('click', exportToPdf);

  // مسح جميع البيانات
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

  // حفظ البيانات الأكاديمية تلقائيًا عند التغيير
  ['facultyName', 'collegeName', 'departmentName', 'academicYear'].forEach((id) => {
    document.getElementById(id).addEventListener('input', saveState);
  });
  el.semester.addEventListener('change', saveState);

  /* =========================================
     16) التهيئة
     ========================================= */

  function init() {
    // تحميل الشعار مسبقًا
    preloadLogoAsBase64();

    // استرجاع الحالة
    const saved = loadState();

    if (saved) {
      // اللغة
      if (saved.lang && (saved.lang === 'ar' || saved.lang === 'en')) {
        currentLang = saved.lang;
        el.langSelect.value = saved.lang;
      }

      // بيانات أكاديمية
      if (saved.academic) {
        el.facultyName.value = saved.academic.facultyName || '';
        el.collegeName.value = saved.academic.collegeName || '';
        el.departmentName.value = saved.academic.departmentName || '';
        el.semester.value = saved.academic.semester || '';
        el.academicYear.value = saved.academic.academicYear || '';
      }

      // أنشطة
      if (Array.isArray(saved.activities)) {
        activities = saved.activities.filter((a) => a && a.id && a.type && Array.isArray(a.days));
      }
    }

    // تطبيق اللغة
    applyLanguage(currentLang);

    // تحديث واجهة النموذج
    updateFormVisibility();

    // رسم الجداول
    renderTables();

    // تعيين اسم الجامعة (قراءة فقط)
    el.universityName.value = t('universityValue');
  }

  // تشغيل عند جهوزية DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
