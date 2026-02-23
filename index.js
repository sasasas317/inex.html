function openCase(caseElement) {
    let modal = document.createElement('div');
    modal.className = 'case-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="roulette">
                <!-- Анимация прокрутки предметов -->
            </div>
            <button onclick="closeModal()">Закрыть</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Анимация рулетки
    animateRoulette();
}