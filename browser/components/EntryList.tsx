import React, { useEffect } from 'react'
import formatDistance from 'date-fns/formatDistance'
import { SiteEntryData } from '../../action/eleventy/data'

const EntryList = ({
  className,
  entries,
  selectEntry,
  selectSite,
  selectBack
}: {
  className?: string
  entries: SiteEntryData[]
  selectEntry: (entryHash: string) => Promise<void>
  selectSite: (siteHash: string) => Promise<void>
  selectBack?: () => void
}) => {
  let element: HTMLElement | null = null
  useEffect(() => {
    if (!element) return
    element.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  })

  return (
    <section
      ref={(section) => {
        element = section
      }}
      className={`prose pb-4 w-full sm:w-96 flex-shrink-0 p-6 sm:overflow-auto ${className}`}
    >
      <a className="cursor-pointer sm:hidden" onClick={selectBack}>
        ← Back
      </a>
      {entries.map((entry) => (
        <div key={`entry-${entry.entryHash}`}>
          <h3>
            <a
              className="cursor-pointer"
              onClick={() => selectEntry(entry.entryHash)}
            >
              {entry.title}
            </a>
          </h3>
          <small>
            <a
              className="cursor-pointer"
              onClick={() => selectSite(entry.siteHash)}
            >
              {entry.siteTitle}
            </a>
            ,{formatDistance(entry.date, new Date())}
          </small>
        </div>
      ))}
      {entries.length === 0 && (
        <div key="none">
          <h3>No contents</h3>
        </div>
      )}
      <div className="pb-8"></div>
    </section>
  )
}
export default EntryList
