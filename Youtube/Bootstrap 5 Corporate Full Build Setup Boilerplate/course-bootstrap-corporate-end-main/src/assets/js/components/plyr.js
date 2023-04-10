import Plyr from 'plyr';

(function () {
    const videoModalsIframe = document.querySelectorAll('.modal-video');
    let currentModalPlyr;

    function setIframeSRCValue({ modal, value = '' }) {
        const iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = value;
        }
    }

    function playVideoInsideModal(event, modal) {
        const value = event.relatedTarget.dataset.pixrVideoIframe;
        const plyr = modal.querySelector('.modal-video-player');

        if (value && plyr) {
            setIframeSRCValue({ modal, value });

            const options = event.relatedTarget.dataset.plyr ? 
                            JSON.parse(event.relatedTarget.dataset.plyr) : {};
            currentModalPlyr = new Plyr(plyr, options);
        }


    }

    videoModalsIframe.forEach((modal) => {
        modal.addEventListener('show.bs.modal', function(event) {
            playVideoInsideModal(event, modal);
        });
        
        modal.addEventListener('hide.bs.modal', function(event) {
            currentModalPlyr.destroy();
        });

        modal.addEventListener('hidden.bs.modal', function(event) {
            setIframeSRCValue({ modal });
        });
    });
})();