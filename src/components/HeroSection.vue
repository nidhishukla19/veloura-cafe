<script setup lang="ts">
</script>

<template>
  <section class="hero-section">

    <!-- Full Background Image -->
    <img
      class="hero-background"
      src="/images/hero/hero.webp"
      alt="Veloura Café"
      loading="eager"
      fetchpriority="high"
    />

    <!-- Very Soft Image Overlay -->
    <div class="hero-overlay"></div>

    <!-- Hero Content -->
    <div class="hero-content">

      <div class="hero-copy">

        <p class="hero-subtitle">
          WELCOME TO OUR CAFÉ
        </p>

        <h1>
          Coffee made
          <br />
          with <span>love.</span>
        </h1>

        <p class="hero-text">
          Freshly roasted coffee, delicious food, and a cozy place
          to slow down and enjoy the moment.
        </p>

        <div class="hero-actions">

          <RouterLink
            to="/menu"
            class="btn-primary"
          >
            Explore Menu
          </RouterLink>

          <RouterLink
            to="/about"
            class="btn-secondary"
          >
            Our Story
          </RouterLink>

        </div>

      </div>

    </div>

  </section>
</template>

<style scoped>

/* =========================================
   HERO SECTION
========================================= */

.hero-section {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 80px);

  display: flex;
  align-items: center;

  overflow: hidden;
  box-sizing: border-box;
}


/* =========================================
   FULL CLEAR BACKGROUND IMAGE
========================================= */

.hero-background {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center center;

  z-index: 0;

  /* IMPORTANT:
     No blur and no opacity here */
  filter: none;
}


/* =========================================
   VERY LIGHT OVERLAY
   Keeps the image CLEAR
========================================= */

.hero-overlay {
  position: absolute;
  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      90deg,
      rgba(255, 248, 245, 0.20) 0%,
      rgba(255, 248, 245, 0.12) 25%,
      rgba(255, 248, 245, 0.04) 48%,
      rgba(255, 248, 245, 0) 70%,
      rgba(255, 248, 245, 0) 100%
    );
}


/* =========================================
   HERO CONTENT
========================================= */

.hero-content {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 1250px;

  margin: 0 auto;

  padding: 80px 6%;

  box-sizing: border-box;
}


/* =========================================
   SOFT AREA ONLY BEHIND TEXT
========================================= */

.hero-content::before {
  content: "";

  position: absolute;

  left: 3%;
  top: 5%;
  bottom: 5%;

  width: 55%;

  border-radius: 40px;

  background:
    linear-gradient(
      90deg,
      rgba(255, 248, 245, 0.22),
      rgba(255, 248, 245, 0.10),
      rgba(255, 248, 245, 0)
    );

  /*
    Only this small area gets a soft glass effect.
    The complete image does NOT get blurred.
  */
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);

  pointer-events: none;
}


/* =========================================
   TEXT AREA
========================================= */

.hero-copy {
  position: relative;
  z-index: 3;

  max-width: 650px;
}


/* =========================================
   SUBTITLE
========================================= */

.hero-subtitle {
  margin: 0 0 22px;

  color: var(--mauve, #98547c);

  font-size: 16px;
  font-weight: 700;

  letter-spacing: 3px;
}


/* =========================================
   HEADING
========================================= */

.hero-content h1 {
  margin: 0 0 28px;

  color: #321f24;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: clamp(4rem, 7vw, 7rem);

  font-weight: 500;

  line-height: 0.95;

  letter-spacing: -4px;
}

.hero-content h1 span {
  color: var(--mauve, #98547c);
}


/* =========================================
   DESCRIPTION
========================================= */

.hero-text {
  max-width: 620px;

  margin: 0 0 35px;

  color: #5f4b51;

  font-size: 18px;

  line-height: 1.8;
}


/* =========================================
   BUTTONS
========================================= */

.hero-actions {
  display: flex;

  align-items: center;

  gap: 16px;
}


/* Common button */
.btn-primary,
.btn-secondary {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 54px;

  padding: 0 30px;

  border-radius: 30px;

  font-size: 16px;
  font-weight: 600;

  text-decoration: none;

  transition: all 0.3s ease;
}


/* =========================================
   PRIMARY BUTTON
========================================= */

.btn-primary {
  background: var(--mauve, #98547c);

  color: #ffffff;

  box-shadow:
    0 12px 28px rgba(152, 84, 124, 0.30);
}

.btn-primary:hover {
  transform: translateY(-3px);

  box-shadow:
    0 16px 35px rgba(152, 84, 124, 0.38);
}


/* =========================================
   SECONDARY BUTTON
========================================= */

.btn-secondary {
  background: rgba(255, 255, 255, 0.48);

  border: 1px solid var(--mauve, #98547c);

  color: var(--mauve, #98547c);

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.btn-secondary:hover {
  background: var(--mauve, #98547c);

  color: white;

  transform: translateY(-3px);
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 900px) {

  .hero-section {
    min-height: calc(100vh - 70px);
  }

  .hero-content {
    padding: 70px 7%;
  }

  /*
    Smaller soft area on tablet
  */
  .hero-content::before {
    left: 2%;
    width: 70%;

    background:
      linear-gradient(
        90deg,
        rgba(255, 248, 245, 0.28),
        rgba(255, 248, 245, 0.12),
        rgba(255, 248, 245, 0)
      );

    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }

  .hero-content h1 {
    font-size: clamp(3.5rem, 8vw, 5.5rem);

    letter-spacing: -3px;
  }

  .hero-text {
    max-width: 540px;

    font-size: 17px;
  }
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 600px) {

  .hero-section {
    min-height: calc(100vh - 65px);

    align-items: center;
  }

  .hero-background {
    object-position: 65% center;
  }

  /*
    Mobile needs slightly more readability
    but image still remains visible.
  */
  .hero-overlay {
    background:
      linear-gradient(
        90deg,
        rgba(255, 248, 245, 0.40) 0%,
        rgba(255, 248, 245, 0.22) 55%,
        rgba(255, 248, 245, 0.08) 100%
      );
  }

  .hero-content {
    padding: 60px 7%;
  }

  .hero-content::before {
    left: 0;
    top: 3%;
    bottom: 3%;

    width: 100%;

    border-radius: 30px;

    background:
      rgba(255, 248, 245, 0.18);

    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }

  .hero-copy {
    max-width: 100%;

    text-align: center;
  }

  .hero-subtitle {
    font-size: 13px;

    letter-spacing: 2px;
  }

  .hero-content h1 {
    font-size: clamp(3.2rem, 14vw, 4.5rem);

    letter-spacing: -2px;

    line-height: 0.98;
  }

  .hero-text {
    margin-left: auto;
    margin-right: auto;

    font-size: 15px;

    line-height: 1.7;
  }

  .hero-actions {
    justify-content: center;

    flex-wrap: wrap;
  }
}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 420px) {

  .hero-content {
    padding: 50px 6%;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-actions {
    flex-direction: column;

    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;

    box-sizing: border-box;
  }
}

</style>