using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LogWebAPI.Models
{
  public enum LogLevel
  {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
  }
}