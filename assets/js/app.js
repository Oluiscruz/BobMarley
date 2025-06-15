// Lista de músicas
function Escopo() {

    function ouvir() {
        const btnOuvir = document.querySelector('.btn-seeMore').addEventListener('click', () => {
            const mainMusic = document.querySelector('.section-music');
            if (mainMusic) {
                mainMusic.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    ouvir();

    function Musica() {
        const playlist = [
            {
                title: "No Woman, No Cry",
                artist: "Bob Marley & The Wailers",
                cover: "./assets/img/legend.jpg",
                file: "./assets/music/No-Woman-No-Cry.mp3"
            },

            {
                title: "Turn Your Lights Down Low",
                artist: "Bob Marley & The Wailers",
                cover: "./assets/img/Exodus.jpeg",
                file: "./assets/music/Turn-Your-Lights-Down-Low.mp3"
            },

            {
                title: "Redemption Song",
                artist: "Bob Marley & The Wailers",
                cover: "./assets/img/uprising.jpeg",
                file: "./assets/music/Redemption-Song.mp3"
            },

            {
                title: "Natural Mystic",
                artist: "Bob Marley & The Wailers",
                cover: "./assets/img/Exodus.jpeg",
                file: "./assets/music/Natural-Mystic.mp3"
            }
        ];

        // Elementos do player
        const audioPlayer = document.getElementById('audio-player');
        const playBtn = document.querySelector('.play-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const progressBar = document.querySelector('.progress-bar');
        const progress = document.querySelector('.progress');
        const currentTimeEl = document.querySelector('.current-time');
        const totalTimeEl = document.querySelector('.total-time');
        const volumeSlider = document.querySelector('.volume-slider');
        const songTitle = document.querySelector('.song-title');
        const artistName = document.querySelector('.artist');
        const albumCover = document.querySelector('.album-cover');

        let currentTrack = 0;
        let isPlaying = false;

        // Funções auxiliares
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function loadTrack(trackIndex) {
            const track = playlist[trackIndex];
            audioPlayer.src = track.file;
            songTitle.textContent = track.title;
            artistName.textContent = track.artist;
            albumCover.src = track.cover;
        }

        function updateProgress() {
            const { currentTime, duration } = audioPlayer;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }

        function togglePlay() {
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audioPlayer.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        }

        function playNext() {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
            if (isPlaying) audioPlayer.play();
        }

        function playPrev() {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            if (isPlaying) audioPlayer.play();
        }

        // Event Listeners
        playBtn.addEventListener('click', togglePlay);

        prevBtn.addEventListener('click', playPrev);
        nextBtn.addEventListener('click', playNext);

        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', playNext);

        progressBar.addEventListener('click', (e) => {
            const progressWidth = progressBar.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            audioPlayer.currentTime = (clickX / progressWidth) * duration;
        });

        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            audioPlayer.volume = volume;
        });

        // Inicialização
        loadTrack(currentTrack);
        audioPlayer.volume = volumeSlider.value / 100;

    }
    Musica();
}
Escopo();

