using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LogWebAPI.Models
{
  public class LogEntry
  {
    public DateTime EntryDate { get; set; }
    public string Message { get; set; }
    public LogLevel Level { get; set; }
    public object[] ExtraInfo { get; set; }
  }
}