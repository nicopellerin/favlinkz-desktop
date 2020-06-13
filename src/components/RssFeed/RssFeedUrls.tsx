import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useHistory, Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import { Feed, ParsedFeed } from "../../models/feed"

import dots from "../../assets/dots.svg"
import { maxLength } from "../../utils"

const RssFeedUrls = () => {
  const history = useHistory()
  const feed = history?.location?.state?.feed

  const latestVariants = {
    hidden: {
      y: 10,
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
        velocity: 2,
        staggerChildren: 0.02,
      },
    },
    exit: {
      transition: {
        type: "tween",
        damping: 100,
        stiffness: 80,
        staggerChildren: 0.5,
      },
    },
  }

  return (
    <Wrapper
      initial="hidden"
      animate="show"
      exit="exit"
      variants={latestVariants}
    >
      {feed?.items?.length && (
        <FeedList>
          {feed?.image.match(/\.(jpg|gif|png)$/) !== null && (
            <FeedImage src={feed?.image} alt="Og image" />
          )}
          <Title>
            {maxLength(
              feed?.title ||
                feed?.link?.split(".")[1][0].toUpperCase() +
                  feed?.link?.split(".")[1].slice(1)
            )}
          </Title>
          <Url>
            <a href={feed?.link}>{feed?.link}</a>
          </Url>
          <DotsWrapper>
            <Dots src={dots} alt="dots" draggable="false" />
          </DotsWrapper>
          {feed?.items?.slice(0, 10).map((feed: ParsedFeed) => (
            <FeedItem key={feed.title}>
              <a
                data-tip={maxLength(feed.contentSnippet, 140)}
                href={feed.link}
                target="_blank"
              >
                {feed.title}
              </a>
              <ReactTooltip
                backgroundColor="#5856d7"
                border={true}
                borderColor="#615de0"
                delayShow={500}
                delayUpdate={0}
              />
            </FeedItem>
          ))}
        </FeedList>
      )}
      <Link
        to={{ pathname: "/profile/rssfeed", state: { from: "rssFeedsUrls" } }}
      >
        <PrevIcon
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 80,
            delay: 0.3,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
            <path
              d="M 0.429 0.318 C 0.843 -0.106 1.525 -0.106 1.94 0.318 L 9.493 8.055 C 9.913 8.485 9.913 9.172 9.493 9.602 L 9.493 9.602 C 9.079 10.026 8.397 10.026 7.982 9.602 L 0.429 1.865 C 0.009 1.435 0.009 0.748 0.429 0.318 Z M 9.379 8.229 C 9.799 8.659 9.799 9.346 9.379 9.776 L 1.826 17.513 C 1.412 17.937 0.729 17.937 0.315 17.513 L 0.315 17.513 C -0.105 17.083 -0.105 16.396 0.315 15.966 L 7.869 8.229 C 8.283 7.805 8.965 7.805 9.379 8.229 Z"
              transform="translate(0.016 0.085) rotate(-180 4.904 8.916)"
              fill={"var(--primaryColor)"}
            ></path>
          </svg>
          <BackText>Back</BackText>
        </PrevIcon>
      </Link>
    </Wrapper>
  )
}

export default RssFeedUrls

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 150px);
`

const FeedList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin-top: 0;
  transition: color 300ms ease-in-out;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  a {
    color: ${(props) => props.theme.textColor};

    &:hover {
      text-decoration: underline;
    }
  }
`

const FeedItem = styled.li`
  color: #333;
  font-size: 1.6rem;

  &:not(:last-child) {
    margin-bottom: 1.4rem;
  }
`

const Title = styled.h3`
  color: var(--primaryColor);
  margin-bottom: 1rem;
  font-size: 3.6rem;
  font-weight: 500;
  text-align: center;
  max-width: 80%;
`

const Url = styled.h5`
  font-size: 1.6rem;
  margin-bottom: 2.6rem;
  /* font-weight: 400; */
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`

const Dots = styled.img`
  margin: 0rem 0 2.6rem;
  text-align: center;
`

const PrevIcon = styled(motion.div)`
  user-select: none;
  cursor: pointer;
  z-index: 2;
  background: ${(props) => props.theme.prevIcon};
  height: 40px;
  width: 80px;
  border-radius: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 0.75rem rgba(89, 86, 213, 0.2));
`

const BackText = styled.span`
  margin-left: 1rem;
  font-size: 1.4rem;
  color: var(--primaryColor);
`

const FeedImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  object-fit: cover;
  margin-bottom: 1.6rem;
`
