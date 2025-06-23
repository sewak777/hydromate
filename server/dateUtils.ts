// Date utility functions for proper timezone handling

export function getCurrentDateInTimezone(timezone: string = 'America/Toronto'): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(now);
  
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  
  return `${year}-${month}-${day}`;
}

export function getDateInTimezone(date: Date, timezone: string = 'America/Toronto'): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(date);
  
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  
  return `${year}-${month}-${day}`;
}

export function getDateRangeInTimezone(daysAgo: number, timezone: string = 'America/Toronto'): { startDate: string; endDate: string } {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - daysAgo);
  
  return {
    startDate: getDateInTimezone(pastDate, timezone),
    endDate: getCurrentDateInTimezone(timezone)
  };
}