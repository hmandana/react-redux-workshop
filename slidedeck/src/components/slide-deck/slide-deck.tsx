import * as React from 'react';

import 'reveal.js/css/reveal.css';
import 'object-partners-revealjs-theme';
import 'highlight.js/styles/monokai.css';

import '!style-loader!css-loader?importLoaders=1!postcss-loader?config=node_modules/object-partners-presentation/dist/config-files/postcss.config.js!sass-loader!./slide-deck.scss'; // hack required because object-partners-presentation is not extensible enough

interface Props {
  slides: string[][];
}

interface State {}

export class SlideDeck extends React.Component<Props, State> {
  componentDidMount() {
    require.ensure([
      'reveal.js',
      'reveal.js/lib/js/classList.js',
      'reveal.js/lib/js/head.min.js',
      'reveal.js/lib/js/html5shiv.js',
      'highlight.js'
    ], () => {
      const Reveal = require('reveal.js');
      require('reveal.js/lib/js/classList.js');
      require('reveal.js/lib/js/head.min.js');
      require('reveal.js/lib/js/html5shiv.js');

      (window as any).Reveal = Reveal;
      const hljs = require('highlight.js');

      Reveal.initialize({
        history: true,
        margin: 0.20,
        dependencies: [
          {
            async: true,
            src: require('reveal.js/plugin/zoom-js/zoom.js')
          },
          {
            async: true,
            src: require('reveal.js/plugin/markdown/marked.js')
          },
          {
            async: true,
            src: require('reveal.js/plugin/notes/notes.js')
          },
          {
            src: '',
            callback() {
              hljs.initHighlightingOnLoad();
            }
          }
        ]
      });

    });
  }

  render() {
    const { slides } = this.props;
    return (
      <div className="reveal">
        <div className="slides">
          <section data-state="title">
            <h1>React</h1>
            <h2>HDC - September 6, 2017</h2>
          </section>
          {
            slides
              .map((deck: any[], deckIndex: number) => {
                return (
                  <section key={deckIndex}>
                    {
                      deck
                        .map((html: any, slideIndex: number) => {
                          return (
                            <section
                              key={`${deckIndex}-${slideIndex}`} dangerouslySetInnerHTML={{ __html: html }} // #yolo
                            />
                          );
                        })
                    }
                  </section>
                );
              })
          }
          <section data-state="title">
            <h1>Thanks!</h1>
            <h3>Follow us! @objectpartners</h3>
          </section>
        </div>
      </div>
    );
  }
}
