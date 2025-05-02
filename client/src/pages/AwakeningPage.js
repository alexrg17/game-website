"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import rockstar1 from "../assets/AllTogether1.png";
import "../styles/StoryPages.scss";

const AwakeningPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page">
      <div className="story-container">
        <h1 className="story-title">About Rising Stars</h1>

        <div className="story-hero">
          <img
            src={rockstar1 || "/placeholder.svg"}
            alt="About Rising Stars"
            className="story-image"
          />
        </div>

        <div className="story-content">
          <section>
            <p>
              Originally music could only be enjoyed in person. If you were not
              near someone playing music, you could not hear it, and anytime
              music needed to be played somewhere, it would have to be done
              live. Eventually recording equipment was invented which meant
              music could be enjoyed several places at once after a single
              recording, although people would have to go out and choose which
              music to listen to.
            </p>

            <p>
              This changed with radio, where any song could be broadcast to a
              whole nation of people, who may never have listened to it
              otherwise, and this became a common way for people to find new
              music to listen to. Many people would even record the songs played
              on the radio.
            </p>

            <p>
              The music video changed how many people experienced music. Music
              channels pushed out, and made many songs much more popular than
              they would have been otherwise. It gave a visual to something
              which used to be sound only, and it gave new meaning to songs, and
              gave them an extra layer of depth..
            </p>

            <p>
              Now it is rare for a song to come out without a music video, and
              we want to add the next step in this evolution.
            </p>

            <h2>Rising Stars</h2>
            <p>
              Rising stars is a platform for music creators to push their music
              out to get it into more ears, in a fun and interactive way! Each
              song is given it's own level which is made specifically for that
              song, making every level feel unique, almost as if they were an
              interactive music video!
            </p>

            <p>
              There are currently 3 levels. Each contains a small story which
              are all interlinked in some way, the same way an artist may do a
              series of music videos with an overarching story. Future levels
              could link with this story, or they could be their own stories.
            </p>

            <h2>Current Story</h2>
            <p>
              Currently, our story follows 3 characters in the city of Silton,
              where music has been banned. Lyra is a rebel, who continues to
              spread her music around, while using her athletic skills to avoid
              capture. Jett works with Lyra, being the one to provide her with
              what she needs, such as discs to be able to spread the music to
              people. Bob is an ordinary working man with no care for music, who
              gets caught up fighting robots who prevent him from getting to
              work on time.
            </p>

            <p>
              We wanted to make a story that was connected in each level, to
              tell a story about creativity, in a world where it can be hard to
              find.
            </p>

            <h2>Our Goal</h2>
            <p>
              Our goal is to create a platform for music artists to be able to
              push their music out to more people in a new playful way not
              possible before. What we have at the moment is merely a concept,
              and we want to push the idea forward even more, to create a
              better, more in depth experience.
            </p>
          </section>

          <hr className="story-divider" />

          <section>
            <h1>A Music Rebellion</h1>
            <h2>In a world without music…</h2>
            <p>
              Silton is a town where music is banned. Sounds are regulated and
              people live lives without the joys of music. Despite this, there
              is a small rebellion forming, to help bring music to the masses!
            </p>

            <h2>The Rebels</h2>
            <p>
              Lyra is a young and confident woman. Her love for making music is
              strong, and she is determined to spread the joys of music to the
              world. She is known by the city's police force, but Lyra can
              always use her quick wit and athletic ability to escape and live
              to compose another day.
            </p>

            <p>
              Jett moves in the shadows to supply Lyra with everything she needs
              to spread music. Jett is the son of two once famous musicians who
              were taken by the state. Being force to live alone for his younger
              life taught him how to fight and fend for himself. On this
              particular day, he breaks into a warehouse to steal a disc for
              Lyra to burn her music onto, while Lyra distracts the city's
              police force.
            </p>

            <p>
              Bob is your ordinary working man. On his way to work he has a
              clash with a robot, who is blocking a path due to a known criminal
              on the run, leading Bob to go down a route he had never taken
              before. Down back alleyways, he uses his electrical know-how, and
              his new-found fighting ability, to get to work on time, not
              knowing that some one may be watchinging him...
            </p>

            <h2>The Beginning</h2>
            <p>
              The 3 levels in the current version of Rising Stars will bring you
              through the start of a story about these 3 characters, who all
              have different motives, to create a world where music can be
              spread to the masses.
            </p>

            <p>Will you join them?.....</p>

            <h2>Play And Listen…</h2>
            <p>
              Rising Stars is filled with several music masterpieces, which will
              guide you through each of the levels. Ranging from upbeat rock, to
              calm cinematic, to funky beats, there is something for everyone!
            </p>
          </section>

          <div className="story-navigation">
            <h3>Meet the Characters</h3>
            <div className="character-links">
              <Link to="/character/bob" className="character-link">
                <span>Bob's Story</span>
              </Link>
              <Link to="/character/lyra" className="character-link">
                <span>Lyra's Story</span>
              </Link>
              <Link to="/character/jett" className="character-link">
                <span>Jett's Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwakeningPage;
