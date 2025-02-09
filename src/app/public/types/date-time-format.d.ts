type DateTimeFormat =
  | 'ccc, LLLL dd, yyyy hh:mm a' // Wed, November 12, 2023 06:00 AM
  | 'MM/dd/yyyy, hh:mm a' // 01/01/2025, 01:00 AM
  | 'MM/dd/yyyy, hh:mm a (ZZZZ)' // 01/01/2025, 01:00 AM (CDT)
  | 'MM/dd/yyyy' // 01/01/2025
  | 'h:mm a (ZZZZ)' // 1:00 AM (CDT)
  // Relative date ("Today", "in 3 days", "3 days ago", etc.). If relative date
  // is greater than a week, return full date 'MM/dd/yyyy'.
  | 'relative-date'
  // Relative date and time ("Today, 2:00 PM", "04/29/1990, 11:00 AM", etc.).
  | 'relative-datetime';
