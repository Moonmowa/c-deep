import React, { useState, useEffect } from "react";
import topicsData from "../../data/topics.json";
import "./Articles.css";
import Navbar from '../common/NavBar/Navbar';

function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-snippet-wrapper">
      <pre className="code-snippet">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="copy-button"
        aria-label="Copy code to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function Example({ example }) {
  return (
    <article className="article-content" tabIndex={-1}>
      <h2 className="article-title">{example.title}</h2>
      <p className="article-description">{example.description}</p>
      {example.snippet && <CodeSnippet code={example.snippet.code} />}
      {example.additionalDescription && (
        <p className="article-additional">{example.additionalDescription}</p>
      )}
    </article>
  );
}

function Sidebar({ topics, selectedTopicId, selectedExampleId, onSelect }) {
  return (
    <aside className="sidebar" aria-label="Topics sidebar">
      {topics.map((topic) => {
        const isTopicSelected =
          topic.id === selectedTopicId &&
          (!selectedExampleId || topic.examples?.some(ex => ex.id === selectedExampleId));

        return (
          <div key={topic.id} className="sidebar-topic-group">
            <button
              className={`sidebar-item ${isTopicSelected ? "selected" : ""}`}
              onClick={() => onSelect(topic.id)}
              aria-current={isTopicSelected ? "page" : undefined}
              type="button"
            >
              {topic.title}
            </button>

            {topic.examples?.length > 1 && topic.id === selectedTopicId && (
              <div className="sidebar-subitems" role="list">
                {topic.examples.map((ex) => (
                  <button
                    key={ex.id}
                    className={`sidebar-subitem ${ex.id === selectedExampleId ? "selected" : ""}`}
                    onClick={() => onSelect(topic.id, ex.id)}
                    aria-current={ex.id === selectedExampleId ? "page" : undefined}
                    type="button"
                  >
                    {ex.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

function MobileTopicNav({ topics, selectedTopicId, selectedExampleId, onSelect }) {
  const currentTopic = topics.find(t => t.id === selectedTopicId);

  const enableTopicScrollSnap = topics.length > 2;
  const enableSubtopicScrollSnap = currentTopic && currentTopic.examples?.length > 2;

  return (
    <nav className="mobile-topic-nav" aria-label="Topics navigation">
      <div
        className={`mobile-topic-scroll ${enableTopicScrollSnap ? "scroll-enabled" : ""}`}
        role="list"
      >
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`mobile-topic-item ${topic.id === selectedTopicId ? "selected" : ""}`}
            onClick={() => onSelect(topic.id)}
            aria-current={topic.id === selectedTopicId ? "page" : undefined}
            type="button"
          >
            {topic.title}
          </button>
        ))}
      </div>

      {currentTopic && currentTopic.examples?.length > 0 && (
        <div
          className={`mobile-examples-list ${enableSubtopicScrollSnap ? "scroll-enabled" : ""}`}
          role="list"
        >
          {currentTopic.examples.map((ex) => (
            <button
              key={ex.id}
              className={`mobile-example-item ${ex.id === selectedExampleId ? "selected" : ""}`}
              onClick={() => onSelect(selectedTopicId, ex.id)}
              aria-current={ex.id === selectedExampleId ? "page" : undefined}
              type="button"
            >
              {ex.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default function Articles() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedExampleId, setSelectedExampleId] = useState(null);

  useEffect(() => {
    setTopics(topicsData);

    if (topicsData.length > 0) {
      const firstTopic = topicsData[0];
      setSelectedTopicId(firstTopic.id);

      if (firstTopic.examples?.length >= 1) {
        setSelectedExampleId(firstTopic.examples[0].id);
      } else {
        setSelectedExampleId(null);
      }
    }
  }, []);

  const currentTopic = topics.find((t) => t.id === selectedTopicId);
  let currentExample = null;

  if (currentTopic) {
    if (selectedExampleId) {
      currentExample = currentTopic.examples?.find((ex) => ex.id === selectedExampleId) || null;
    } else if (currentTopic.examples?.length === 1) {
      currentExample = currentTopic.examples[0];
    }
  }

  function handleSelect(topicId, exampleId = null) {
    setSelectedTopicId(topicId);

    const topic = topics.find((t) => t.id === topicId);

    if (exampleId) {
      setSelectedExampleId(exampleId);
    } else if (topic && topic.examples?.length === 1) {
      setSelectedExampleId(topic.examples[0].id);
    } else if (topic && topic.examples?.length > 1) {
      setSelectedExampleId(topic.examples[0].id);
    } else {
      setSelectedExampleId(null);
    }
  }

  return (
    <>
      <Navbar />

      <section className="articles-intro-banner">
        <div className="intro-banner-inner">
          <h2>Front-End Learnings & Real-World Fixes</h2>
          <p>
            This space is where I share what I’ve learned — from tackling tricky front-end bugs to breaking down core concepts that every developer should understand. It’s not just about theory; it’s about what really works in real-world projects. Each post reflects hands-on experience and thoughtful exploration, aimed at helping developers build with more clarity and confidence. I’ll keep adding more lessons and discoveries as I continue building, learning, and pushing boundaries.          </p>
        </div>
      </section>
      <section className="articles-wrapper" aria-live="polite">

        <Sidebar
          topics={topics}
          selectedTopicId={selectedTopicId}
          selectedExampleId={selectedExampleId}
          onSelect={handleSelect}
        />

        <MobileTopicNav
          topics={topics}
          selectedTopicId={selectedTopicId}
          selectedExampleId={selectedExampleId}
          onSelect={handleSelect}
        />

        <main className="articles-container">
          {currentTopic && (
            <>
              <h1 className="topic-title">{currentTopic.title}</h1>
              <p className="topic-description">{currentTopic.description}</p>

              {currentExample ? (
                <Example example={currentExample} />
              ) : currentTopic.link ? (
                <div className="external-link-wrapper">
                  <p>

                    <a
                      href={currentTopic.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click this link
                    </a>.
                  </p>
                </div>
              ) : (
                <p style={{ marginTop: "1rem", color: "#6b7280", fontStyle: "italic" }}>
                  No examples or additional resources available.
                </p>
              )}
            </>
          )}
        </main>
      </section>
    </>
  );
}
