using GeoLib.WindowsHost.Contracts;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;

namespace GeoLib.WindowsHost.Services
{
    [ServiceBehavior(UseSynchronizationContext = false, IncludeExceptionDetailInFaults = true)]
    public class MessageManager : IMessageService
    {
        public void ShowMessage(string message)
        {
            MainWindow.MainUI.ShowMessage(message + " | Process " + Process.GetCurrentProcess().Id.ToString());
        }
    }
}
