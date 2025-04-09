document.addEventListener('DOMContentLoaded', () => {
    let aboutMeData;
    let projectsData;

    fetch('./starter/data/aboutMeData.json')
        .then(response => response.json())
        .then(data =>{
            aboutMeData = data;
            populateAboutMe();
        })
        .catch(error => console.error('Error fetching aboutMeData', error));

    fetch('./starter/data/projectsData.json')
    .then(response => response.json())
    .then(data => {
        projectsData = data;
        populateProjects();
        setupProjectNavigation();
        setupFormValidation();
    })
    .catch(error => console.error('Error fetching projectsData', error));

    function populateAboutMe(){
        const aboutMeDiv = document.getElementById('aboutMe');
        const aboutMeparagraph = document.createElement('p');
        aboutMeparagraph.textContent = aboutMeData.aboutMe;
        aboutMeDiv.appendChild(aboutMeparagraph);

        const headshotContainer = document.createElement('div');
        headshotContainer.classList.add('headshotContainer');
        const headshotImage = document.createElement('img');
        headshotImage.src = aboutMeData.headshot;
        headshotImage.alt = 'Headshot';
        headshotContainer.appendChild(headshotImage);
        aboutMeDiv.appendChild(headshotContainer);
    };

    function populateProjects(){
        const projectList = document.getElementById('projectList');
        const projectSpotlight = document.getElementById('projectSpotlight');
        const projectSpotlightTitle = document.getElementById('projectSpotlightTitle');
        updateSpotlight(projectsData[0]);
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('projectCard');
            projectCard.id = project.project_id;

            const projectName = document.createElement('h4');
            projectName.textContent = project.project_name || 'Project Name';
            projectCard.appendChild(projectName);

            
            const projectDescription = document.createElement('p');
            projectDescription.textContent = project.short_description || 'Project Description';
            projectCard.appendChild(projectDescription);

            projectCard.style.backgroundImage = `url(${project.card_image || './images/card_placeholder_bg.webp'})`;
            projectCard.style.backgroundSize = 'cover'; 
            projectCard.style.backgroundPosition = 'center';
            projectCard.addEventListener('click', () => updateSpotlight(project));
            projectList.appendChild(projectCard);

        });
    };

    function updateSpotlight(project){
        
        spotlightTitles.innerHTML = `<h3>${project.project_name || 'project name'}</h3><p>${project.long_description || 'project description'}</p><a href="${project.url || '#'}" target="_blank">Clik here for more </a>`;
        projectSpotlight.style.backgroundImage = `url(${project.spotlight_image || './images/card_placeholder_bg.webp'})`;
        projectSpotlight.style.backgroundSize = 'cover'; 
        projectSpotlight.style.backgroundPosition = 'center';   
    };

    function setupProjectNavigation(){
        const projectList = document.getElementById('projectList');
        const arrowLeft = document.querySelector('.arrow-left');
        const arrowRight = document.querySelector('.arrow-right');

        arrowLeft.addEventListener('click', () =>{
            if(window.matchMedia('(width >= 1024px)').matches){
                projectList.scrollTop -= projectList.clientHeight / 2;
            }else{
                projectList.scrollLeft -= projectList.clientWidth / 2;
            }
            
        });

        arrowRight.addEventListener('click',() => {
            if(window.matchMedia('(width >= 1024px)').matches){
                arrowRight.scrollTop += projectList.clientHeight / 2;
            }else{
                projectList.scrollLeft += projectList.clientWidth/2;
            }
        });

    };

    function setupFormValidation(){
        const form = document.getElementById('formSection');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const charactersLeft = document.getElementById('charactersLeft');

        const illegalCharacters = /[^a-zA-Z0-9@._-]/;
        const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        messageInput.addEventListener('input', () => {
            const remainingChars = 300 - messageInput.value.length;
            charactersLeft.textContent = `Characters: ${messageInput.value.length}/300`;
            if (remainingChars < 0) {
              messageInput.value = messageInput.value.substring(0, 300);
              charactersLeft.textContent = `Characters: 300/300`;
            }
        });
      
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;
      
            emailError.textContent = '';
            messageError.textContent = '';
      
            if (!emailInput.value) {
              emailError.textContent = 'Email is required.';
              isValid = false;
            } else if (!validEmailAddress.test(emailInput.value)) {
              emailError.textContent = 'Invalid email format.';
              isValid = false;
            } else if (illegalCharacters.test(emailInput.value)) {
              emailError.textContent = 'Email contains invalid characters.';
              isValid = false;
            }
      
            if (!messageInput.value) {
              messageError.textContent = 'Message is required.';
              isValid = false;
            } else if (illegalCharacters.test(messageInput.value)) {
              messageError.textContent = 'Message contains invalid characters.';
              isValid = false;
            } else if (messageInput.value.length > 300) {
              messageError.textContent = 'Message exceeds 300 characters.';
              isValid = false;
            }
      
            if (isValid) {
              alert('Form validation passed!');
            }
        });
        
    };


});