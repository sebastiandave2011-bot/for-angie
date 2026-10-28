/**
 * ============================================================================
 * SCRIPT PRINCIPAL - SPA REGALO 14 MESES (ANGIE Y SEBASTIAN)
 * ============================================================================
 * Contiene:
 * 1. Diccionario e internacionalización (Carga en Inglés por defecto, alternable a Español).
 * 2. Lógica de la Pantalla de Bloqueo (Corazón interactivo en gama Azul Claro #4FC3F7).
 * 3. Controlador de Reproducción Directa para las 10 canciones (./audio/*.mp3).
 * 4. Carrusel interactivo de 10 fotos (Soporte táctil/arrastre y pausa al tocar).
 * 5. Contador dinámico en tiempo real desde el 11 de septiembre de 2025.
 * 6. Mapa interactivo Leaflet.js con pines de corazón azul claro (#4FC3F7) y popups.
 * 7. Cuestionario interactivo "Última Sorpresa" y revelación de Tarjeta Dorada.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     ÍCONO VECTORIAL DE CORAZÓN EN AZUL CLARO PURO (#4FC3F7 / #29B6F6)
     ========================================================================== */
  const SKY_HEART_SVG =
    '<svg class="sky-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

  /* ==========================================================================
     1. SISTEMA DE IDIOMAS (INGLÉS POR DEFECTO / ALTERNABLE A ESPAÑOL)
     ========================================================================== */
  let currentLang = 'en';

  const translations = {
    en: {
      gateway_badge: '14 Months of Love',
      gateway_title: `Hello, Angie ${SKY_HEART_SVG}`,
      gateway_instruction:
        'Tap the heart several times to fill it with love and unlock your surprise',
      hero_badge: `14 Months ${SKY_HEART_SVG}`,
      hero_title: 'For Angie',
      hero_sub1: 'Angie & Sebastian',
      hero_sub2: 'From: Sebastian',
      hero_sub3: 'November 11, 2026',
      song_tag: 'A special cover recorded with all my heart',
      song_title: 'Our Song',
      song_caption: `Every single note of this song carries everything I feel for you 🎸 ${SKY_HEART_SVG}`,
      playlist_tag: 'The soundtrack of our love story',
      playlist_title: 'Our Songs',
      playlist_badge: 'OUR SPECIAL PLAYLIST',
      playlist_name: 'Angie & Sebastian: 14 Months',
      playlist_desc: '10 songs that remind me of you in every chord.',
      play_all_play: 'Play All',
      play_all_pause: 'Pause Playlist',
      play_all_resume: 'Resume Playlist',
      gallery_tag: 'Our favorite photographs',
      gallery_title: 'Unforgettable Moments',
      gallery_hint:
        'Swipe in either direction to browse our photos. Tap any image to pause the slideshow.',
      carousel_playing: '✨ Autoplay active',
      carousel_paused: '⏸️ Carousel paused (tap here to resume)',
      slide_1: 'Memory #1 • Your smile brightens my days',
      slide_2: 'Memory #2 • Walking hand in hand',
      slide_3: 'Memory #3 • Partners in every adventure',
      slide_4: 'Memory #4 • Unforgettable sunsets with you',
      slide_5: 'Memory #5 • Hugs that stop time',
      slide_6: 'Memory #6 • Discovering new landscapes together',
      slide_7: 'Memory #7 • Every detail by your side is magical',
      slide_8: 'Memory #8 • Laughter I keep in my soul',
      slide_9: 'Memory #9 • My favorite place is always you',
      slide_10: 'Memory #10 • To infinite more moments together',
      letter_stamp: `${SKY_HEART_SVG} 14 Months`,
      letter_title: 'Hello my love',
      letter_p1:
        'Today we celebrate 14 months since that unforgettable <strong>September 11, 2025</strong>, the day our story began and my life changed forever in the most beautiful way I could ever imagine.',
      letter_p2:
        'Looking back and remembering every laugh, every hug, every trip to see waterfalls, our endless talks, and even the quiet moments by your side fills my heart with immense happiness. With you I learned that true love feels like peace, like home, and like the most exciting adventure of all.',
      letter_p3:
        'Thank you for your tenderness, for your unique way of loving me, for supporting me in every step, and for making every day with you worthwhile. No matter where we are, if I am holding your hand I know I am in the exact right place.',
      letter_p4:
        'Happy 14 months, my beautiful Angie. This is just one more chapter of the whole lifetime I want to keep writing with you. I love you with all my heart.',
      letter_sign_label: 'With all my love,',
      timeline_tag: 'Building our love step by step',
      timeline_title: 'Our Timeline',
      counter_title: 'Days together since September 11, 2025',
      counter_days_word: 'days',
      counter_hours: 'Hours',
      counter_minutes: 'Minutes',
      counter_seconds: 'Seconds',
      event_1_badge: 'Milestone #1 • Sep 11, 2025',
      event_1_title: 'Our first date on September 11, 2025',
      event_1_desc:
        'The official start of our adventure together; the butterflies, the smiles, and knowing something magical had just begun.',
      event_2_badge: 'Milestone #2 • Nature & Love',
      event_2_title: 'Our first time at a waterfall',
      event_2_desc:
        'Listening to the sound of the water while holding you close was one of the purest and most unforgettable moments of our story.',
      event_3_badge: 'Milestone #3 • With all my heart',
      event_3_title: 'Our first gift',
      event_3_desc:
        'A gesture full of excitement to remind you how much you mean to me and how much I love making you smile.',
      voice_title: 'Voice Message',
      voice_subtitle: `Close your eyes for a moment, press play, and listen to what I have to tell you ${SKY_HEART_SVG}`,
      places_tag: 'Coordinates where we were endlessly happy',
      places_title: 'Our Places',
      places_hint: `Click on each heart ${SKY_HEART_SVG} on the map (or on the cards below) to see our special places.`,
      place_1_name: 'Mirador de La Calera',
      place_1_desc:
        'Where the city lights sparkled below us, yet my eyes could only look at you while we held each other against the cold.',
      place_2_name: 'Sarku Restaurant',
      place_2_desc:
        'Special flavors at Centro Mayor, shared smiles across the table, and that sweet feeling that any meal with you becomes the perfect date.',
      place_3_name: 'Poke Bowls Restaurant',
      place_3_desc:
        'Our delicious spot in Bogotá to share cravings, talk about our day, and enjoy the joy of simple things together.',
      place_4_name: 'Salto de las Monjas',
      place_4_desc:
        'Among green trails and the magical rush of falling water, we discovered how wonderful it is to explore the world hand in hand.',
      place_5_name: 'Cascada del Escobo',
      place_5_desc:
        'A hidden paradise in nature that keeps the echo of our laughter and the unforgettable memory of our adventure together.',
      place_6_name: 'Monserrate',
      place_6_desc:
        'Up high above Bogotá, closer to the clouds and holding your hand while admiring the whole city together.',
      place_7_name: 'UNAD',
      place_7_desc:
        'Our university, where studying, growing, and sharing dreams by your side makes every effort worthwhile.',
      place_8_name: 'Health and Life Gym',
      place_8_desc:
        'Training together, motivating each other in every routine, and proving we are the best team inside and outside the gym.',
      place_9_name: 'Corferias (SOFA)',
      place_9_desc:
        'An amazing day exploring geek culture, exhibitions, and endless fun together at SOFA.',
      farewell_names: 'Angie & Sebastian',
      farewell_quote: 'To a lifetime with all my love',
      surprise_btn: 'One Last Surprise',
      quiz_tag: 'How well do you remember our story?',
      quiz_title: 'Our Love Quiz',
      quiz_instructions: `Answer all questions correctly to unlock your final surprise gift ${SKY_HEART_SVG}`,
      q1_title: '1. Where was our first kiss?',
      q1_opt1: 'At the park',
      q1_opt2: "In front of Don Cretino's house",
      q1_opt3: 'At the movie theater',
      q2_title: '2. Who said "I love you" first?',
      q2_opt1: 'Me (Sebastian)',
      q2_opt2: 'You (Angie)',
      q2_opt3: 'At the exact same time',
      q3_title: '3. When did we know this was serious?',
      q3_opt1: 'On our first trip',
      q3_opt2: 'When we went to the waterfall',
      q3_opt3: 'From the very first moment',
      q4_title: '4. On what magical date did our love story officially begin?',
      q4_opt1: 'February 14, 2025',
      q4_opt2: 'September 11, 2025',
      q4_opt3: 'December 24, 2025',
      q5_title: '5. How long do I want to keep creating memories and adventures with you?',
      q5_opt1: 'Just for this year',
      q5_opt2: 'Until our next waterfall trip',
      q5_opt3: 'For a whole lifetime together',
      quiz_submit_btn: `Check my answers ${SKY_HEART_SVG}`,
      quiz_incomplete: `Some questions are still unanswered, my love! Please pick an option for each question ${SKY_HEART_SVG}`,
      quiz_wrong:
        'Almost there, my love! One or more answers are not quite right. Try again, you got this! 😘',
      prize_badge: 'CONGRATULATIONS MY LOVE! 5/5 CORRECT ANSWERS',
      prize_title: 'Good for a surprise date together!',
      prize_desc:
        'You proved you know every single detail of our story. Get ready and dress up even prettier, because this golden voucher is redeemable for an unforgettable surprise date planned by me.',
      prize_valid: `Valid for: Angie ${SKY_HEART_SVG}`,
      prize_from: 'Granted by: Sebastian',
      footer_text: `Made with all my love for Angie • Happy 14 Months ${SKY_HEART_SVG}`
    },
    es: {
      gateway_badge: '14 Meses de Amor',
      gateway_title: `Hola, Angie ${SKY_HEART_SVG}`,
      gateway_instruction:
        'Toca el corazón varias veces para llenarlo de amor y descubrir tu sorpresa',
      hero_badge: `14 Meses ${SKY_HEART_SVG}`,
      hero_title: 'Para Angie',
      hero_sub1: 'Angie y Sebastian',
      hero_sub2: 'De: Sebastian',
      hero_sub3: '11 de noviembre de 2026',
      song_tag: 'Un cover grabado con todo mi corazón',
      song_title: 'Nuestra Canción',
      song_caption: `Cada nota de esta canción lleva todo lo que siento por ti 🎸 ${SKY_HEART_SVG}`,
      playlist_tag: 'La banda sonora de nuestra historia',
      playlist_title: 'Nuestras Canciones',
      playlist_badge: 'NUESTRA PLAYLIST ESPECIAL',
      playlist_name: 'Angie & Sebastian: 14 Meses',
      playlist_desc: '10 canciones que me recuerdan a ti en cada acorde.',
      play_all_play: 'Reproducir toda la lista',
      play_all_pause: 'Pausar lista',
      play_all_resume: 'Reanudar lista',
      gallery_tag: 'Nuestras fotografías favoritas',
      gallery_title: 'Momentos que no se borran',
      gallery_hint:
        'Desliza hacia cualquier lado para ver nuestras fotos. Toca una imagen para detener el carrusel.',
      carousel_playing: '✨ Reproducción automática activa',
      carousel_paused: '⏸️ Carrusel detenido (toca aquí para reanudar)',
      slide_1: 'Recuerdo #1 • Tu sonrisa ilumina mis días',
      slide_2: 'Recuerdo #2 • Caminando juntos de la mano',
      slide_3: 'Recuerdo #3 • Cómplices en cada aventura',
      slide_4: 'Recuerdo #4 • Atardeceres inolvidables contigo',
      slide_5: 'Recuerdo #5 • Abrazos que detienen el tiempo',
      slide_6: 'Recuerdo #6 • Descubriendo nuevos paisajes',
      slide_7: 'Recuerdo #7 • Cada detalle a tu lado es mágico',
      slide_8: 'Recuerdo #8 • Risas que guardo en el alma',
      slide_9: 'Recuerdo #9 • Mi lugar favorito siempre eres tú',
      slide_10: 'Recuerdo #10 • Por infinitos momentos más juntos',
      letter_stamp: `${SKY_HEART_SVG} 14 Meses`,
      letter_title: 'Hola mi amor',
      letter_p1:
        'Hoy cumplimos 14 meses desde aquel inolvidable <strong>11 de septiembre de 2025</strong>, el día en que nuestra historia comenzó y mi vida cambió para siempre de la forma más hermosa que jamás imaginé.',
      letter_p2:
        'Mirar hacia atrás y recordar cada risa, cada abrazo, cada viaje a ver cascadas, nuestras charlas interminables y hasta los pequeños silencios a tu lado me llena el pecho de una felicidad inmensa. Contigo aprendí que el amor verdadero se siente como paz, como hogar y como la aventura más emocionante de todas.',
      letter_p3:
        'Gracias por tu ternura, por tu forma tan única de quererme, por apoyarme en cada paso y por hacer que cada día a tu lado valga la pena. No importa dónde estemos, si estoy tomando tu mano sé que estoy exactamente en el lugar correcto.',
      letter_p4:
        'Felices 14 meses, mi Angie preciosa. Este es solo un capítulo más de la vida entera que quiero seguir escribiendo contigo. Te amo con todo mi corazón.',
      letter_sign_label: 'Con todo mi amor,',
      timeline_tag: 'Paso a paso construyendo nuestro amor',
      timeline_title: 'Nuestra línea de tiempo',
      counter_title: 'Días juntos desde el 11 de septiembre de 2025',
      counter_days_word: 'días',
      counter_hours: 'Horas',
      counter_minutes: 'Minutos',
      counter_seconds: 'Segundos',
      event_1_badge: 'Hito #1 • 11 Sep 2025',
      event_1_title: 'Nuestra primera cita el 11 de septiembre del 2025',
      event_1_desc:
        'El inicio oficial de nuestra aventura juntos; los nervios, las sonrisas y la certeza de que algo mágico acababa de empezar.',
      event_2_badge: 'Hito #2 • Naturaleza y Amor',
      event_2_title: 'Nuestra primera vez en una cascada',
      event_2_desc:
        'Escuchar el sonido del agua mientras te abrazaba fue uno de los momentos más puros e inolvidables de nuestra historia.',
      event_3_badge: 'Hito #3 • Con todo el corazón',
      event_3_title: 'Nuestro primer detalle',
      event_3_desc:
        'Un gesto lleno de ilusión para recordarte cuánto significas para mí y cuánto me encanta hacerte sonreír.',
      voice_title: 'Mensaje de voz',
      voice_subtitle: `Cierra los ojos un momento, dale a reproducir y escucha lo que tengo para decirte ${SKY_HEART_SVG}`,
      places_tag: 'Coordenadas donde fuimos inmensamente felices',
      places_title: 'Nuestros lugares',
      places_hint: `Haz clic en cada corazón ${SKY_HEART_SVG} del mapa (o en las tarjetas de abajo) para ver nuestros lugares especiales.`,
      place_1_name: 'Mirador de La Calera',
      place_1_desc:
        'Donde las luces de la ciudad brillaban a nuestros pies, pero mis ojos solo podían mirarte a ti mientras nos abrazábamos contra el frío.',
      place_2_name: 'Restaurante Sarku',
      place_2_desc:
        'Sabores especiales en Centro Mayor, risas cómplices en la mesa y esa sensación tan bonita de que cualquier cena contigo se convierte en una cita perfecta.',
      place_3_name: 'Restaurante Poke Bowls',
      place_3_desc:
        'Nuestro rincón delicioso en Bogotá para compartir antojos, contarnos nuestro día y disfrutar de la alegría de las cosas simples juntos.',
      place_4_name: 'Salto de las Monjas',
      place_4_desc:
        'Entre senderos verdes y la fuerza mágica del agua cayendo, descubrimos lo hermoso que es explorar el mundo tomados de la mano.',
      place_5_name: 'Cascada del Escobo',
      place_5_desc:
        'Un paraíso escondido en la naturaleza que guarda el eco de nuestras risas y el recuerdo imborrable de nuestra aventura juntos.',
      place_6_name: 'Monserrate',
      place_6_desc:
        'En lo más alto de Bogotá, más cerca de las nubes y tomados de la mano mientras contemplábamos toda la ciudad juntos.',
      place_7_name: 'UNAD',
      place_7_desc:
        'Nuestra universidad, donde estudiar, crecer y compartir sueños a tu lado hace que cada esfuerzo valga la pena.',
      place_8_name: 'Health and Life Gym',
      place_8_desc:
        'Entrenando juntos, motivándonos en cada rutina y demostrando que somos el mejor equipo dentro y fuera del gimnasio.',
      place_9_name: 'Corferias (SOFA)',
      place_9_desc:
        'Un día increíble explorando cultura geek, exhibiciones y diversión sin fin juntos en el SOFA.',
      farewell_names: 'Angie y Sebastian',
      farewell_quote: 'Por una vida con todo el cariño',
      surprise_btn: 'Última Sorpresa',
      quiz_tag: '¿Qué tanto recuerdas de nuestra historia?',
      quiz_title: 'El Test de Nuestro Amor',
      quiz_instructions: `Responde correctamente todas las preguntas para desbloquear tu regalo final ${SKY_HEART_SVG}`,
      q1_title: '1. ¿Dónde fue nuestro primer beso?',
      q1_opt1: 'En el parque',
      q1_opt2: 'Frente a la casa de Don Cretino',
      q1_opt3: 'En el cine',
      q2_title: '2. ¿Quién dijo te amo primero?',
      q2_opt1: 'Yo (Sebastian)',
      q2_opt2: 'Tú (Angie)',
      q2_opt3: 'Fue al mismo tiempo',
      q3_title: '3. ¿Cuál fue el momento en que supimos que era en serio?',
      q3_opt1: 'En nuestro primer viaje',
      q3_opt2: 'Cuando fuimos a la cascada',
      q3_opt3: 'Desde el primer momento',
      q4_title: '4. ¿En qué fecha mágica comenzó oficialmente nuestra historia?',
      q4_opt1: 'El 14 de febrero de 2025',
      q4_opt2: 'El 11 de septiembre de 2025',
      q4_opt3: 'El 24 de diciembre de 2025',
      q5_title: '5. ¿Cuánto tiempo quiero seguir sumando momentos y aventuras a tu lado?',
      q5_opt1: 'Solo por este año',
      q5_opt2: 'Hasta nuestra próxima visita a una cascada',
      q5_opt3: 'Por toda una vida juntos',
      quiz_submit_btn: `Comprobar mis respuestas ${SKY_HEART_SVG}`,
      quiz_incomplete: `¡Faltan preguntas por responder, mi amor! Selecciona una opción en cada pregunta ${SKY_HEART_SVG}`,
      quiz_wrong:
        '¡Casi mi amor! Alguna respuesta no es la correcta. ¡Inténtalo de nuevo, tú puedes! 😘',
      prize_badge: '¡FELICIDADES MI AMOR! 5/5 RESPUESTAS CORRECTAS',
      prize_title: '¡Vale por una salida sorpresa juntos!',
      prize_desc:
        'Has demostrado que conoces cada detalle de nuestra historia. Prepárate y ponte aún más hermosa, porque este cupón dorado es canjeable por una cita inolvidable planeada por mí.',
      prize_valid: `Válido para: Angie ${SKY_HEART_SVG}`,
      prize_from: 'Otorgado por: Sebastian',
      footer_text: `Hecho con todo mi amor para Angie • Felices 14 Meses ${SKY_HEART_SVG}`
    }
  };

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langToggleText = document.getElementById('lang-toggle-text');
  let isCarouselPaused = false;
  let updateMapPopupsLang = null;

  function applyTranslations(lang) {
    const dict = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key === 'carousel_playing' || key === 'carousel_paused') {
        el.textContent = isCarouselPaused ? dict.carousel_paused : dict.carousel_playing;
        return;
      }
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    langToggleText.textContent = lang === 'en' ? 'ES / Español' : 'EN / English';

    if (typeof updateMapPopupsLang === 'function') {
      updateMapPopupsLang(lang);
    }
  }

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    applyTranslations(currentLang);
  });

  /* ==========================================================================
     2. PANTALLA DE BLOQUEO / GATEWAY (CORAZÓN INTERACTIVO EN AZUL CLARO)
     El usuario debe hacer clic/tocar 5 veces el corazón para llenarlo al 100%.
     ========================================================================== */
  const gatewayScreen = document.getElementById('gateway-screen');
  const gatewayHeartBtn = document.getElementById('gateway-heart-btn');
  const stopFill = document.getElementById('heart-gradient-stop-fill');
  const stopEmpty = document.getElementById('heart-gradient-stop-empty');
  const progressFill = document.getElementById('gateway-progress-fill');
  const progressText = document.getElementById('gateway-progress-text');
  const heartParticles = document.getElementById('heart-particles');

  const TOTAL_TAPS_REQUIRED = 5;
  let currentTaps = 0;

  document.body.classList.add('locked');

  function spawnMiniHeart() {
    const mini = document.createElement('span');
    mini.className = 'floating-mini-heart';
    mini.innerHTML = SKY_HEART_SVG;

    const randomX = Math.floor(Math.random() * 90) - 45;
    mini.style.left = '50%';
    mini.style.top = '50%';
    mini.style.setProperty('--dx', `${randomX}px`);

    heartParticles.appendChild(mini);
    setTimeout(() => mini.remove(), 900);
  }

  gatewayHeartBtn.addEventListener('click', () => {
    if (currentTaps >= TOTAL_TAPS_REQUIRED) return;

    currentTaps += 1;
    const percentage = Math.round((currentTaps / TOTAL_TAPS_REQUIRED) * 100);

    stopFill.setAttribute('offset', `${percentage}%`);
    stopEmpty.setAttribute('offset', `${percentage}%`);
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;

    const scaleValue = 1 + currentTaps * 0.04;
    gatewayHeartBtn.querySelector('.heart-svg').style.transform = `scale(${scaleValue})`;

    gatewayHeartBtn.classList.remove('pulse-tap');
    void gatewayHeartBtn.offsetWidth;
    gatewayHeartBtn.classList.add('pulse-tap');

    spawnMiniHeart();
    spawnMiniHeart();

    if (currentTaps === TOTAL_TAPS_REQUIRED) {
      setTimeout(() => {
        gatewayScreen.classList.add('unlocked');
        document.body.classList.remove('locked');
      }, 450);
    }
  });

  /* ==========================================================================
     RESPALDO AUTOMÁTICO DE IMÁGENES LOCALES (SOPORTE .webp Y .jpg)
     Permite que tanto los archivos .webp actuales en ./images/ como las rutas
     .jpg alternativas funcionen sin romper ninguna imagen.
     ========================================================================== */
  function attachImageFallback(imgEl) {
    if (!imgEl) return;
    imgEl.addEventListener('error', function onImgError() {
      const fallbackSrc = imgEl.getAttribute('data-fallback');
      const triedFallback = imgEl.getAttribute('data-tried-fallback') === 'true';

      if (fallbackSrc && !triedFallback && imgEl.getAttribute('src') !== fallbackSrc) {
        imgEl.setAttribute('data-tried-fallback', 'true');
        imgEl.src = fallbackSrc;
      } else if (imgEl.getAttribute('data-tried-default') !== 'true') {
        imgEl.setAttribute('data-tried-default', 'true');
        imgEl.src = './images/hero-image.webp';
      }
    });
  }

  document.querySelectorAll('img').forEach(attachImageFallback);

  /* ==========================================================================
     3. CONTROLADOR DE REPRODUCCIÓN DIRECTA DE LAS 10 CANCIONES (<audio>)
     - Enlaza cada canción con su archivo local en ./audio/*.mp3.
     - Incluye botón global "Reproducir Toda la Lista" (#play-all-btn) que
       reproduce las 10 canciones en secuencia continua, pausa al hacer clic
       mientras suena y reanuda desde el segundo exacto (currentTime) donde
       se detuvo, manteniendo sincronizados los botones individuales.
     ========================================================================== */
  const songFiles = [
    './audio/save-me.mp3',
    './audio/i-want-to-know-what-love-is.mp3',
    './audio/follow-me.mp3',
    './audio/si-tu-no-estas-aqui.mp3',
    './audio/is-this-love.mp3',
    './audio/i-remember-you.mp3',
    './audio/siempre-estas-alli.mp3',
    './audio/ill-be-there-for-you.mp3',
    './audio/forever.mp3',
    './audio/amor-del-bueno.mp3'
  ];

  const songItems = Array.from(document.querySelectorAll('.song-list .song-item'));
  const voiceAudio = document.getElementById('voice-audio');
  const playAllBtn = document.getElementById('play-all-btn');
  const playAllIcon = document.getElementById('play-all-icon');
  const playAllLabel = document.getElementById('play-all-label');

  let currentTrackIndex = 0;
  let hasStartedPlaylist = false;

  function isAnySongPlaying() {
    return songItems.some((item) => {
      const audio = item.querySelector('.song-audio');
      return audio && !audio.paused;
    });
  }

  function updatePlayAllButtonUI() {
    if (!playAllBtn || !playAllIcon || !playAllLabel) return;
    const dict = translations[currentLang];

    if (isAnySongPlaying()) {
      playAllBtn.classList.add('playing');
      playAllIcon.textContent = '⏸';
      playAllLabel.setAttribute('data-i18n', 'play_all_pause');
      playAllLabel.textContent = dict.play_all_pause;
    } else if (hasStartedPlaylist) {
      playAllBtn.classList.remove('playing');
      playAllIcon.textContent = '▶';
      playAllLabel.setAttribute('data-i18n', 'play_all_resume');
      playAllLabel.textContent = dict.play_all_resume;
    } else {
      playAllBtn.classList.remove('playing');
      playAllIcon.textContent = '▶';
      playAllLabel.setAttribute('data-i18n', 'play_all_play');
      playAllLabel.textContent = dict.play_all_play;
    }
  }

  function pauseAllSongsExcept(activeAudio = null, resetOtherTimes = false) {
    songItems.forEach((item) => {
      const audio = item.querySelector('.song-audio');
      const btn = item.querySelector('.song-play-btn');
      if (audio && audio !== activeAudio) {
        audio.pause();
        if (resetOtherTimes) {
          audio.currentTime = 0;
        }
        item.classList.remove('playing');
        if (btn) btn.textContent = '▶';
      }
    });
  }

  function playSongAtIndex(index, resetTime = false) {
    const targetItem = songItems[index];
    if (!targetItem) return;

    const targetAudio = targetItem.querySelector('.song-audio');
    const targetBtn = targetItem.querySelector('.song-play-btn');
    if (!targetAudio || !targetBtn) return;

    const isSwitchingTrack = currentTrackIndex !== index;
    currentTrackIndex = index;
    hasStartedPlaylist = true;

    pauseAllSongsExcept(targetAudio, isSwitchingTrack);

    if (voiceAudio && !voiceAudio.paused) {
      voiceAudio.pause();
    }

    if (resetTime) {
      targetAudio.currentTime = 0;
    }

    targetItem.classList.add('playing');
    targetBtn.textContent = '⏸';
    updatePlayAllButtonUI();

    targetAudio.play().catch((err) => {
      console.warn(`No se pudo reproducir ${targetAudio.src}:`, err);
    });
  }

  function pauseCurrentSong() {
    const currentItem = songItems[currentTrackIndex];
    if (!currentItem) return;

    const currentAudio = currentItem.querySelector('.song-audio');
    const currentBtn = currentItem.querySelector('.song-play-btn');

    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentItem.classList.remove('playing');
      if (currentBtn) currentBtn.textContent = '▶';
    } else {
      pauseAllSongsExcept(null, false);
    }

    updatePlayAllButtonUI();
  }

  songItems.forEach((item, index) => {
    const audio = item.querySelector('.song-audio');
    const playBtn = item.querySelector('.song-play-btn');

    if (!audio || !playBtn) return;

    if (songFiles[index]) {
      audio.src = songFiles[index];
    }

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        playSongAtIndex(index, false);
      } else {
        audio.pause();
        item.classList.remove('playing');
        playBtn.textContent = '▶';
        updatePlayAllButtonUI();
      }
    });

    audio.addEventListener('ended', () => {
      item.classList.remove('playing');
      playBtn.textContent = '▶';
      audio.currentTime = 0;

      if (index + 1 < songItems.length) {
        playSongAtIndex(index + 1, true);
      } else {
        currentTrackIndex = 0;
        hasStartedPlaylist = false;
        updatePlayAllButtonUI();
      }
    });
  });

  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      if (isAnySongPlaying()) {
        pauseCurrentSong();
      } else {
        playSongAtIndex(currentTrackIndex, false);
      }
    });
  }

  if (voiceAudio) {
    voiceAudio.addEventListener('play', () => {
      if (isAnySongPlaying()) {
        pauseCurrentSong();
      }
    });
  }

  /* ==========================================================================
     4. CARRUSEL INTERACTIVO "MOMENTOS QUE NO SE BORRAN"
     - 10 slides con desplazamiento táctil (swipe) o con mouse.
     - Al hacer clic o tocar una imagen, el carrusel se detiene.
     ========================================================================== */
  const viewport = document.getElementById('carousel-viewport');
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const statusBadge = document.getElementById('carousel-status-badge');

  let currentSlide = 0;
  let autoPlayTimer = null;
  const AUTOPLAY_INTERVAL_MS = 3600;

  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Slide ${idx + 1}`);
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(idx);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

  function updateCarouselUI() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index) {
    const total = slides.length;
    currentSlide = (index + total) % total;
    updateCarouselUI();
  }

  function startAutoPlay() {
    stopAutoPlay(false);
    isCarouselPaused = false;
    statusBadge.classList.remove('paused');
    statusBadge.textContent = translations[currentLang].carousel_playing;

    autoPlayTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, AUTOPLAY_INTERVAL_MS);
  }

  function stopAutoPlay(updateBadge = true) {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (updateBadge) {
      isCarouselPaused = true;
      statusBadge.classList.add('paused');
      statusBadge.textContent = translations[currentLang].carousel_paused;
    }
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentSlide + 1);
  });

  statusBadge.style.cursor = 'pointer';
  statusBadge.addEventListener('click', () => {
    if (isCarouselPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay(true);
    }
  });

  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  function onPointerDown(clientX) {
    isDragging = true;
    startX = clientX;
    deltaX = 0;
    stopAutoPlay(true);
  }

  function onPointerMove(clientX) {
    if (!isDragging) return;
    deltaX = clientX - startX;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;

    const SWIPE_THRESHOLD = 45;
    if (deltaX < -SWIPE_THRESHOLD) {
      goToSlide(currentSlide + 1);
    } else if (deltaX > SWIPE_THRESHOLD) {
      goToSlide(currentSlide - 1);
    }
    deltaX = 0;
  }

  viewport.addEventListener(
    'touchstart',
    (e) => {
      if (e.target.closest('.carousel-nav-btn')) return;
      onPointerDown(e.touches[0].clientX);
    },
    { passive: true }
  );

  viewport.addEventListener(
    'touchmove',
    (e) => {
      onPointerMove(e.touches[0].clientX);
    },
    { passive: true }
  );

  viewport.addEventListener('touchend', onPointerUp);

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.carousel-nav-btn')) return;
    onPointerDown(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX);
  });

  window.addEventListener('mouseup', onPointerUp);

  startAutoPlay();

  /* ==========================================================================
     5. CONTADOR DINÁMICO EN TIEMPO REAL
     Calcula los días exactos, horas, minutos y segundos transcurridos desde
     el 11 de septiembre de 2025 (2025-09-11T00:00:00).
     ========================================================================== */
  const START_DATE = new Date(2025, 8, 11, 0, 0, 0);
  const daysEl = document.getElementById('days-count-value');
  const hoursEl = document.getElementById('hours-count-value');
  const minutesEl = document.getElementById('minutes-count-value');
  const secondsEl = document.getElementById('seconds-count-value');

  function updateRelationshipCounter() {
    const now = new Date();
    const diffMs = Math.max(0, now - START_DATE);

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateRelationshipCounter();
  setInterval(updateRelationshipCounter, 1000);

  /* ==========================================================================
     6. MAPA INTERACTIVO CON PINES DE CORAZÓN AZUL CLARO (#4FC3F7) (LEAFLET.JS)
     - Coloca marcadores personalizados en las coordenadas de los 9 lugares.
     - Actualiza dinámicamente la miniatura circular flotante (#map-place-thumb-img)
       en la esquina inferior derecha del mapa al hacer clic en cualquier tarjeta
       de lugar o marcador del mapa.
     ========================================================================== */
  const mapContainer = document.getElementById('places-leaflet-map');
  const mapThumbBox = document.getElementById('map-place-thumb-box');
  const mapThumbImg = document.getElementById('map-place-thumb-img');
  const placeCards = Array.from(document.querySelectorAll('.place-card[data-place-index]'));

  if (mapContainer && typeof L !== 'undefined') {
    const placesData = [
      {
        coords: [4.6784, -74.0185], // Mirador de La Calera
        name_en: `${SKY_HEART_SVG} Mirador de La Calera`,
        name_es: `${SKY_HEART_SVG} Mirador de La Calera`,
        img: './images/la-calera.webp',
        fallbackImg: './images/la_calera.jpg'
      },
      {
        coords: [4.5926, -74.1243], // Sarku - Centro Comercial Centro Mayor, Bogotá
        name_en: `${SKY_HEART_SVG} Sarku (Centro Mayor Mall, Bogotá)`,
        name_es: `${SKY_HEART_SVG} Sarku (C.C. Centro Mayor, Bogotá)`,
        img: './images/sarku.webp',
        fallbackImg: './images/sarku.jpg'
      },
      {
        coords: [4.6669, -74.0543], // Restaurante Poke Bowls, Bogotá
        name_en: `${SKY_HEART_SVG} Poke Bowls Restaurant (Bogotá)`,
        name_es: `${SKY_HEART_SVG} Restaurante Poke Bowls (Bogotá)`,
        img: './images/poke-bowls.webp',
        fallbackImg: './images/poke_bowls.jpg'
      },
      {
        coords: [4.6778, -74.4425], // Salto de las Monjas, Cundinamarca
        name_en: `${SKY_HEART_SVG} Salto de las Monjas`,
        name_es: `${SKY_HEART_SVG} Salto de las Monjas`,
        img: './images/las-monjas.webp',
        fallbackImg: './images/Las Monjas.jpg'
      },
      {
        coords: [5.1186, -74.3461], // Cascada del Escobo, Vergara, Cundinamarca
        name_en: `${SKY_HEART_SVG} Cascada del Escobo`,
        name_es: `${SKY_HEART_SVG} Cascada del Escobo`,
        img: './images/el-escobo.webp',
        fallbackImg: './images/el_escobo.jpg'
      },
      {
        coords: [4.6057, -74.0555], // Cerro de Monserrate, Bogotá
        name_en: `${SKY_HEART_SVG} Monserrate (Bogotá)`,
        name_es: `${SKY_HEART_SVG} Monserrate (Bogotá)`,
        img: './images/monserrate.webp',
        fallbackImg: './images/monserrate.jpg'
      },
      {
        coords: [4.5866, -74.1014], // UNAD, Bogotá
        name_en: `${SKY_HEART_SVG} UNAD`,
        name_es: `${SKY_HEART_SVG} UNAD`,
        img: './images/nuestra-universidad.webp',
        fallbackImg: './images/unad.jpg'
      },
      {
        coords: [4.6015, -74.1132], // Health and Life Gym, Bogotá
        name_en: `${SKY_HEART_SVG} Health and Life Gym`,
        name_es: `${SKY_HEART_SVG} Health and Life Gym`,
        img: './images/gym.webp',
        fallbackImg: './images/gym.jpg'
      },
      {
        coords: [4.6296, -74.0906], // Corferias (SOFA), Bogotá
        name_en: `${SKY_HEART_SVG} Corferias (SOFA, Bogotá)`,
        name_es: `${SKY_HEART_SVG} Corferias (SOFA, Bogotá)`,
        img: './images/sofa.webp',
        fallbackImg: './images/sofa.jpg'
      }
    ];

    function updateMapPlaceThumbnail(idx) {
      const place = placesData[idx];
      if (!place || !mapThumbImg) return;

      mapThumbImg.removeAttribute('data-tried-fallback');
      mapThumbImg.removeAttribute('data-tried-default');
      mapThumbImg.setAttribute('data-fallback', place.fallbackImg);
      mapThumbImg.src = place.img;

      if (mapThumbBox) {
        mapThumbBox.classList.remove('thumb-pop');
        void mapThumbBox.offsetWidth;
        mapThumbBox.classList.add('thumb-pop');
      }

      placeCards.forEach((card) => {
        const cardIdx = Number(card.getAttribute('data-place-index'));
        card.classList.toggle('active-place', cardIdx === idx);
      });
    }

    const map = L.map('places-leaflet-map', {
      scrollWheelZoom: false
    }).setView([4.66, -74.12], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    const heartIcon = L.divIcon({
      className: 'custom-heart-marker',
      html: `<div class="heart-pin-bubble"><span>${SKY_HEART_SVG}</span></div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });

    const markers = placesData.map((place, idx) => {
      const popupTitle = currentLang === 'en' ? place.name_en : place.name_es;
      const marker = L.marker(place.coords, { icon: heartIcon }).addTo(map);
      marker.bindPopup(`<div class="heart-popup-title">${popupTitle}</div>`);
      marker.on('click', () => {
        updateMapPlaceThumbnail(idx);
      });
      return marker;
    });

    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));

    updateMapPopupsLang = (lang) => {
      markers.forEach((marker, idx) => {
        const place = placesData[idx];
        const title = lang === 'en' ? place.name_en : place.name_es;
        marker.setPopupContent(`<div class="heart-popup-title">${title}</div>`);
      });
    };

    placeCards.forEach((card) => {
      card.addEventListener('click', () => {
        const idx = Number(card.getAttribute('data-place-index'));
        const targetMarker = markers[idx];
        updateMapPlaceThumbnail(idx);

        if (targetMarker) {
          map.flyTo(targetMarker.getLatLng(), 15, { duration: 1.1 });
          targetMarker.openPopup();
          mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    updateMapPlaceThumbnail(0);
  }

  /* ==========================================================================
     7. LA ÚLTIMA SORPRESA (CUESTIONARIO INTERACTIVO Y TARJETA DORADA)
     ========================================================================== */
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const quizWrapper = document.getElementById('quiz-Collapsible-wrapper');
  const quizForm = document.getElementById('love-quiz-form');
  const quizFormContainer = document.getElementById('quiz-form-container');
  const quizErrorMsg = document.getElementById('quiz-error-msg');
  const goldenPrizeCard = document.getElementById('golden-prize-card');
  const questionBlocks = Array.from(document.querySelectorAll('.quiz-question-block'));

  openSurpriseBtn.addEventListener('click', () => {
    const isOpen = quizWrapper.classList.toggle('open');
    quizWrapper.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      setTimeout(() => {
        quizWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  });

  questionBlocks.forEach((block) => {
    const optionButtons = Array.from(block.querySelectorAll('.quiz-option-btn'));

    optionButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        optionButtons.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        quizErrorMsg.hidden = true;
      });
    });
  });

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let allAnswered = true;
    let allCorrect = true;

    questionBlocks.forEach((block) => {
      const selectedBtn = block.querySelector('.quiz-option-btn.selected');
      if (!selectedBtn) {
        allAnswered = false;
      } else if (selectedBtn.getAttribute('data-value') !== 'correct') {
        allCorrect = false;
      }
    });

    if (!allAnswered) {
      quizErrorMsg.textContent = translations[currentLang].quiz_incomplete;
      quizErrorMsg.hidden = false;
      return;
    }

    if (!allCorrect) {
      quizErrorMsg.textContent = translations[currentLang].quiz_wrong;
      quizErrorMsg.hidden = false;
      return;
    }

    quizErrorMsg.hidden = true;
    quizFormContainer.hidden = true;
    goldenPrizeCard.hidden = false;
    goldenPrizeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  applyTranslations('en');
});
