import { useEffect, useRef, useState } from "react"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import classNames from "classnames/bind"
import styles from './ExpandableContent.module.css'

const cls = classNames.bind(styles)

export default function ExpandableContent({ text }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const paragraphRef = useRef()

  useEffect(() => {
    const elem = paragraphRef.current
    if (elem.scrollHeight > elem.offsetHeight) {
      setIsTruncated(true)
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <div>
      <p
        ref={paragraphRef}
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "none" : 2,
        }}
      >
        {text}
      </p>
      {isTruncated && (
        <div className={cls("expandButton")} onClick={toggleExpand}>
          {isExpanded && <KeyboardArrowUp />} {isExpanded && "Show Less"}
          {!isExpanded && <KeyboardArrowDown />} {!isExpanded && "Read More"}
        </div>
      )}
    </div>
  )
}
