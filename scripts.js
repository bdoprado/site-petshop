function loadPage(pagePath) {
    fetch(`pages/${pagePath}`)
        .then(response => response.text())
        .then(data => {
            const contentElement = document.getElementById('content');
            if (!contentElement) {
                console.error("Elemento 'content' não encontrado no DOM.");
                return;
            }
            contentElement.innerHTML = data;
            if (pagePath === 'services.html') {
                setupServiceForm();
            }
        })
        .catch(error => console.error('Erro ao carregar a página:', error));
}


function loadComponent(componentPath, elementId, callback) {
    fetch(`components/${componentPath}`)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error(`Elemento com ID '${elementId}' não encontrado no DOM.`);
                return;
            }
            element.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Erro ao carregar o componente:', error));
}

function setupServiceForm() {
    const proceedButton = document.getElementById('proceed');
    if (!proceedButton) {
        console.error('Botão "Prosseguir" não encontrado');
        return;
    }

    proceedButton.addEventListener('click', function () {
        const selectedService = document.getElementById('service').value;

        if (selectedService) {
            document.getElementById('service-selection').style.display = 'none';
            document.getElementById('schedule-section').style.display = 'block';
        } else {
            alert('Por favor, escolha um serviço.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header.html', 'header', () => {
        document.querySelectorAll('.nav-buttons button').forEach(button => {
            button.addEventListener('click', (event) => {
                const page = event.target.getAttribute('data-page');
                loadPage(page);
            });
        });
    });

    loadComponent('footer.html', 'footer');
    loadPage('products.html');
});

