document.addEventListener('DOMContentLoaded', () => {
    // 슬라이드 관련 변수와 함수
    const age = localStorage.getItem('age');
    const grade = localStorage.getItem('grade');
    const type = localStorage.getItem('type');

    if (age) {
        document.getElementById('age').value = age;
    }
    if (grade) {
        document.getElementById('grade').value = grade;
    }
    if (type) {
        document.getElementById('type').value = type;
    }
    const slides = document.querySelector('.highlight-slides');
    const slide = document.querySelectorAll('.highlight-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        updateIndicators();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slide.length;
        showSlide(currentIndex);
    }

    // 3초마다 자동으로 슬라이드 전환
    setInterval(showNextSlide, 3000);

    // 인디케이터 관련 변수와 함수
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('slide-indicators');
    document.querySelector('.highlight-slider').appendChild(indicatorsContainer);

    slide.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('slide-indicator');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
        indicatorsContainer.appendChild(indicator);
    });

    function updateIndicators() {
        const indicators = document.querySelectorAll('.slide-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    showSlide(currentIndex); // 초기 슬라이드 표시 및 인디케이터 업데이트

    // 서비스 버튼 및 작업 관련 변수와 함수
    const services = document.querySelectorAll('.service');
    const tasksContainer = document.querySelector('.tasks');

    const tasksData = {
        'life': [
            { image: 'image/image1.png', text: '건강보험 산정특혜 등록 신청' },
            { image: 'image/image1.png', text: '저소득층 재난적 의료비 지원' }
        ],
        'family': [
            { image: 'image/image2.png', text: '장애가족역량강화프로그램' },
            { image: 'image/image2.png', text: '가정위탁아동 보호지원' }
        ],
        'culture': [
            { image: 'image/image3.png', text: '장애인 정보화 교육' },
            { image: 'image/image3.png', text: '장애아동 역량강화 프로그램' }
        ],
        'employ': [
            { image: 'image/image4.png', text: '장애인 고용 장려금 지원' },
            { image: 'image/image4.png', text: '장애인 취업 알선 지원' }
        ],
        'residential': [
            { image: 'image/image5.png', text: '장애 영유아 거주 시설' },
            { image: 'image/image5.png', text: '주거환경 개선 서비스' }
        ],
        'healthcare': [
            { image: 'image/image6.png', text: '정신건강 복지 서비스' },
            { image: 'image/image6.png', text: '아동 청소년 심리 치유 서비스' }
        ],
        'convenience': [
            { image: 'image/image7.png', text: '장애인 자동차 무료 대여' },
            { image: 'image/image7.png', text: '장애인 방송 시청 지원' }
        ],
        'assistive-devices': [
            { image: 'image/image8.png', text: '보조기기 지원 및 수리 서비스' },
            { image: 'image/image8.png', text: '장애인 보조기기 급여비' }
        ]
    };

    function addTasks(taskType) {
        if (tasksData[taskType]) {
            tasksData[taskType].forEach(taskData => {
                const task = document.createElement('div');
                task.classList.add('task', `task-${taskType}`);
                
                // 작업 아이콘과 텍스트 설정
                const taskIcon = document.createElement('img');
                taskIcon.classList.add('task-icon');
                taskIcon.src = taskData.image;

                const taskText = document.createElement('div');
                taskText.classList.add('task-text');
                taskText.textContent = taskData.text;

                task.appendChild(taskIcon);
                task.appendChild(taskText);
                tasksContainer.appendChild(task);
            });
        }
    }

    function removeTasks(taskType) {
        const tasksToRemove = document.querySelectorAll(`.task-${taskType}`);
        tasksToRemove.forEach(taskToRemove => {
            tasksContainer.removeChild(taskToRemove);
        });
    }

    function toggleTaskSelection(service) {
        const taskType = service.getAttribute('data-task');
        if (service.classList.contains('selected')) {
            // 버튼을 취소하고 작업을 제거
            service.classList.remove('selected');
            removeTasks(taskType);
        } else {
            // 버튼을 선택하고 작업을 추가
            service.classList.add('selected');
            addTasks(taskType);
        }
    }

    services.forEach(service => {
        service.addEventListener('click', () => {
            toggleTaskSelection(service);
        });
    });

    // 전체선택 버튼 클릭 이벤트
    document.querySelector('.all-services').addEventListener('click', () => {
        services.forEach(service => {
            if (!service.classList.contains('selected')) {
                service.classList.add('selected');
                addTasks(service.getAttribute('data-task'));
            }
        });
    });

    // 선택해제 버튼 클릭 이벤트
    document.querySelector('.none-services').addEventListener('click', () => {
        services.forEach(service => {
            if (service.classList.contains('selected')) {
                service.classList.remove('selected');
                removeTasks(service.getAttribute('data-task'));
            }
        });
    });
});