const icons = {
  home: (
    <path
      d="M3.75 9.5 12 3l8.25 6.5v8.25a.75.75 0 0 1-.75.75h-5.25V13h-4.5v5.5H4.5a.75.75 0 0 1-.75-.75Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  ),
  article: (
    <>
      <path d="M5 5.25h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M5 10.25h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M5 15.25h8.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="2.75" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="10.5" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.75 18.5c.8-2.2 2.66-3.3 5.12-3.3 2.45 0 4.23 1.1 5.13 3.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M14.5 17.75c.44-1.35 1.45-2.02 3.03-2.02 1.04 0 1.95.3 2.72.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </>
  ),
  friends: (
    <>
      <circle cx="8.25" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15.75" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.75 18c.65-2.02 2.27-3.02 4.86-3.02 2.59 0 4.21 1 4.86 3.02" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </>
  ),
  requests: (
    <>
      <path d="M12 5v7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M8.5 8.5 12 12l3.5-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  message: (
    <>
      <path d="M5 6.25h14a1.25 1.25 0 0 1 1.25 1.25v8.25A1.25 1.25 0 0 1 19 17H9.5l-4.75 3v-3H5A1.25 1.25 0 0 1 3.75 15.75V7.5A1.25 1.25 0 0 1 5 6.25Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M7.5 10h9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M7.5 13h5.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </>
  ),
  bell: (
    <>
      <path d="M8 18.25c.35 1.12 1.46 2 2.8 2h2.4c1.34 0 2.45-.88 2.8-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M6.25 17h11.5c-.9-1.1-1.5-2.38-1.5-4.75 0-2.68-1.78-4.75-4.25-4.75s-4.25 2.07-4.25 4.75c0 2.37-.6 3.65-1.5 4.75Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 15.75v-8.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M8.75 10.5 12 7.25l3.25 3.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M5.25 18.5h13.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </>
  ),
  logout: (
    <>
      <path d="M10 5H6.25A1.25 1.25 0 0 0 5 6.25v11.5A1.25 1.25 0 0 0 6.25 19H10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M13 8.25 17.25 12 13 15.75" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M9 12h8.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </>
  ),
  comment: (
    <>
      <path d="M5 6.25h14a1.25 1.25 0 0 1 1.25 1.25v8.25A1.25 1.25 0 0 1 19 17H9.5l-4.75 3v-3H5A1.25 1.25 0 0 1 3.75 15.75V7.5A1.25 1.25 0 0 1 5 6.25Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
    </>
  ),
  like: (
    <path
      d="M12 19.5s-6.75-4.2-6.75-9.35A3.9 3.9 0 0 1 9.2 6.2c1.18 0 2.22.5 2.8 1.45.58-.95 1.62-1.45 2.8-1.45a3.9 3.9 0 0 1 3.95 3.95C18.75 15.3 12 19.5 12 19.5Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  ),
}

function Icon({ name, className = '' }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {icons[name] || null}
    </svg>
  )
}

export default Icon
