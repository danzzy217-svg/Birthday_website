import { useEffect } from "react";
import { ArrowDown, Gift, Heart, Images, Sparkles } from "lucide-react";

const portraits = [
  "/media/LCC Outing_01.jpg",
  "/media/Selfie Smile Date pic 04.jpg",
  "/media/Her B&W selfie_01.jpg",
  "/media/Her B&W selfie_02.jpg",
  "/media/LCC Vid 01.mp4",
  "/media/Hands in pocket wo smile Date pic 03.jpg",
  "/media/Pic of us on our first date_01.jpg",
  "/media/LCC _02.mp4",
  "/media/Her B&W selfie_03.jpg",
  "/media/LCC _01.mp4",
  "/media/Pic of us on our first date_02.jpg",
  "/media/LCC _03.mp4",
  "/media/Her at dinner on first date_01.jpg",
  "/media/Her at dinner on first date_02.jpg",
  "/media/LCC Outing_02-her on swing.jpg",
  "/media/F smiling at basketball arcade.mp4",
  "/media/Her at dinner on first date_03.jpg",
  "/media/Vid of her swinging.mp4",
  "/media/Hands in pocket w smile Date pic 02.jpg",
];

const extraImages = [
  "/media/Start of it_01.png",
  "/media/Start of it_02.png",
  "/media/Start of it_03.png",
  "/media/Start of it_04.png",
];

const friendshipImages = [
  "/media/Her for a Job Pic.jpg",
  "/media/Her for check up.jpg",
  "/media/VC Shot_01.jpg",
  "/media/Her win selfie.jpg",
];

const memoriesImages = [
  "/media/VC Shot_02.jpg",
  "/media/VC Shot_03.jpg",
  "/media/Pic on Diocesan Dinner_01.jpg",
  "/media/Pic on Diocesan Dinner_02.jpeg",
  "/media/Her taking a pic before class.jpg",
];

const proofJoyImages = [
  "/media/proof-joy-01.jpg",
  "/media/proof-joy-02.jpg",
];

const futureImage = "/media/future 01.png";
const finalWishImage = "/media/Hands under chin Date pic_01.jpg";
const birthdaySong = "/media/birthday-song.mp3";

const text = {
  greeting: "Happy Birthday Feranmi ✨❤️",
  box: `Before anything else, I just want to say thank you.
Thank you for all the joy, comfort, laughter, and warmth you’ve unknowingly brought into my life. You’ve become such a special part of my days in a way I honestly never expected, and somewhere along the line, the moments with you became memories I found myself holding onto dearly.

So for your birthday, I thought it would be nice for us to take a little stroll down memory lane. From how it all started, to the little moments that slowly made you such a monumental person in my life.

This is just a small collection of memories, smiles, conversations, and moments that remind me how grateful I am to know you.

And while today is about celebrating your birthday, I also hope this reminds you of how loved, appreciated, and genuinely amazing you are.

So… happy birthday, and welcome to our little memory box ✨💖`.trim(),
  joy: "Being around you feels comforting in a way that’s hard to explain. You're like a bundle of warmth that we can't help but be drawn to, and your bright smile holds enough shine to brighten even the darkest day. ✨😊",
  proof: "You're a joy to be around, the pictures here prove so.",
  laughter: "Then came the laughter and a stream of moments.",
  online: "It was just a little change in our standard conversations. A little beginning we didn't notice...",
  friendship: "Then something a little unexpected happened. It turned from casual calls and work chats, into something more......into a beautiful friendship.",
  wish: "Wishing you a day as special as you are. Happy Birthday Feranmi. ✨❤️",
  future: "The Best Memories Aren’t Here Yet. Let’s fill this space with laughter, adventures, late night conversations, and countless beautiful memories going forward. 😄😁",
  explosion: "...and ultimately, an explosion of shared memories",
};

const chapters = [
  {
    label: "01",
    title: "A little beginning",
    body: text.online,
  },
  {
    label: "02",
    title: "Something beautiful",
    body: text.friendship,
  },
  {
    label: "03",
    title: "The memories",
    body: text.laughter,
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useMobileVideoAutoplay() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px), (hover: none)");
    const videos = document.querySelectorAll("video[data-mobile-autoplay]");

    const pauseAll = () => {
      videos.forEach((video) => {
        video.pause();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!mediaQuery.matches) {
          pauseAll();
          return;
        }

        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.56 },
    );

    videos.forEach((video) => observer.observe(video));

    const handleMediaChange = () => {
      if (!mediaQuery.matches) {
        pauseAll();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
}

function useBirthdayAudio() {
  useEffect(() => {
    const audio = document.querySelector("[data-birthday-song]");
    if (!audio) return undefined;

    let hasStarted = false;
    let removeListeners = () => {};

    const startSong = () => {
      if (hasStarted) return;
      hasStarted = true;
      audio.volume = 0.62;
      audio.load();
      audio
        .play()
        .then(removeListeners)
        .catch(() => {
          hasStarted = false;
        });
    };

    const scrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);
    const startFromKey = (event) => {
      if (scrollKeys.has(event.key)) startSong();
    };

    removeListeners = () => {
      document.removeEventListener("wheel", startSong, true);
      document.removeEventListener("touchstart", startSong, true);
      document.removeEventListener("touchmove", startSong, true);
      document.removeEventListener("touchend", startSong, true);
      document.removeEventListener("scroll", startSong, true);
      document.removeEventListener("keydown", startFromKey, true);
    };

    document.addEventListener("wheel", startSong, { capture: true, passive: true });
    document.addEventListener("touchstart", startSong, { capture: true, passive: true });
    document.addEventListener("touchmove", startSong, { capture: true, passive: true });
    document.addEventListener("touchend", startSong, { capture: true, passive: true });
    document.addEventListener("scroll", startSong, { capture: true, passive: true });
    document.addEventListener("keydown", startFromKey, true);

    return removeListeners;
  }, []);
}

function App() {
  useReveal();
  useMobileVideoAutoplay();
  useBirthdayAudio();

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#home" className="brand">
          <Gift size={18} aria-hidden="true" />
          <span>Feranmi</span>
        </a>
        <div className="nav-links">
          <a href="#photos">Photos</a>
          <a href="#proof">Proof</a>
          <a href="#letter">Letter</a>
          <a href="#wish">Wish</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-text" data-reveal>
          <p className="eyebrow">Birthday memory site</p>
          <h1>{text.greeting}</h1>
          <p className="lead">{text.box}</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#letter">
              <Sparkles size={18} aria-hidden="true" />
              Start
            </a>
            <a className="secondary-btn" href="#photos">
              <ArrowDown size={18} aria-hidden="true" />
              See photos
            </a>
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <img className="hero-main" src="/media/Hands in pocket w smile Date pic 02.jpg" alt="Feranmi" />
          <img className="hero-thumb hero-thumb-one" src="/media/Her for check up.jpg" alt="" />
          <img className="hero-thumb hero-thumb-two" src="/media/Pic on Diocesan Dinner_01.jpg" alt="" />
        </div>
      </section>

      <div className="story-timeline" aria-label="Birthday story">
        {chapters.map((chapter, index) => (
          <section className="story-part" data-reveal key={chapter.label}>
            <article className="chapter" style={{ "--delay": "100ms" }}>
              <span>{chapter.label}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
            {index === 0 && (
              <div className="chapter-gallery" data-reveal style={{ "--delay": "200ms" }}>
                <div className="gallery-grid">
                  {extraImages.map((photo, photoIndex) => (
                    <figure
                      className={`photo-card${photoIndex === 0 ? " photo-card-contain" : ""}`}
                      key={photo}
                    >
                      <img src={photo} alt="" loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>
            )}
            {index === 1 && (
              <div className="chapter-gallery" data-reveal style={{ "--delay": "200ms" }}>
                <div className="gallery-grid">
                  {friendshipImages.map((photo) => (
                    <figure className="photo-card" key={photo}>
                      <img src={photo} alt="" loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>
            )}
            {index === 2 && (
              <div className="chapter-gallery" data-reveal style={{ "--delay": "200ms" }}>
                <div className="gallery-grid">
                  {memoriesImages.map((photo, photoIndex) => (
                    <figure
                      className={`photo-card${photoIndex === 3 ? " photo-card-contain" : ""}`}
                      key={photo}
                    >
                      <img src={photo} alt="" loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      <section className="gallery-section" id="photos">
        <div className="section-title" data-reveal>
          <Images size={22} aria-hidden="true" />
          <h2>Photo memories</h2>
        </div>
        <p className="section-footer-text" data-reveal>{text.explosion}</p>
        <div className="gallery-grid">
          {portraits.map((media, index) => {
            const isVideo = media.match(/\.(mp4|webm|mov)$/i);
            return (
              <figure
                className={`photo-card photo-card-${(index % 7) + 1}`}
                data-reveal
                key={media}
                style={{ "--delay": `${(index % 4) * 80}ms` }}
              >
                {isVideo ? (
                  <video
                    src={media}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-mobile-autoplay
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    onError={() => console.error("Failed to load video:", media)}
                  />
                ) : (
                  <img
                    src={media}
                    alt={`Birthday memory ${index + 1}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    onError={() => console.error("Failed to load image:", media)}
                    decoding="async"
                  />
                )}
              </figure>
            );
          })}
        </div>
      </section>

      <section className="proof-section" id="proof">
        <div className="proof-text" data-reveal>
          <p className="eyebrow">The proof</p>
          <h2 className="balance">{text.proof}</h2>
        </div>
        <div className="proof-gallery" data-reveal>
          {proofJoyImages.map((photo, index) => (
            <figure className="proof-photo" key={photo}>
              <img
                src={photo}
                alt={`Proof she's a joy ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="letter-section" id="letter">
        <article className="letter-card" data-reveal>
          <div className="letter-icon">
            <Heart size={24} aria-hidden="true" />
          </div>
          <p className="eyebrow">For you</p>
          <h2>A bundle of warmth</h2>
          <p>{text.joy}</p>
        </article>
      </section>

      <section className="future-section" id="future">
        <div className="future-copy" data-reveal>
          <p className="eyebrow">Looking forward</p>
          <h2>For All The Moments To Come</h2>
          <p>{text.future}</p>
        </div>
        <img src={futureImage} alt="Looking forward" data-reveal loading="lazy" />
      </section>

      <section className="wish-section" id="wish">
        <div className="wish-copy" data-reveal>
          <p className="eyebrow">Final wish</p>
          <h2>{text.wish}</h2>
        </div>
        <img src={finalWishImage} alt="Feranmi birthday memory" loading="lazy" />
      </section>

      <footer className="footer">
        <span>Made with love.</span>
      </footer>
      <audio src={birthdaySong} data-birthday-song preload="auto" loop />
    </main>
  );
}

export default App;
