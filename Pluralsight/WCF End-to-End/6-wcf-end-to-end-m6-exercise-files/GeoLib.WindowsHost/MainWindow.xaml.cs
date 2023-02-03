using GeoLib.Services;
using GeoLib.WindowsHost.Contracts;
using GeoLib.WindowsHost.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Threading;
using System.Windows;

namespace GeoLib.WindowsHost
{
    
    public partial class MainWindow : Window
    {
        public static MainWindow MainUI { get; set; }
        public MainWindow()
        {
            InitializeComponent();

            btnStart.IsEnabled = true;
            btnStop.IsEnabled = false;

            MainUI = this;

            this.Title = "UI Running on Thread " + Thread.CurrentThread.ManagedThreadId +
                " | Process " + Process.GetCurrentProcess().Id.ToString();

            _SyncContext = SynchronizationContext.Current;
        }

        SynchronizationContext _SyncContext = null;
        ServiceHost _HostGeoManager = null;
        ServiceHost _HostMessageManager = null;
        
        private void btnStart_Click(object sender, RoutedEventArgs e)
        {
            _HostGeoManager = new ServiceHost(typeof(GeoManager));
            _HostMessageManager = new ServiceHost(typeof(MessageManager));

            _HostGeoManager.Open();
            _HostMessageManager.Open();

            btnStart.IsEnabled = false;
            btnStop.IsEnabled = true;
        }

        private void btnStop_Click(object sender, RoutedEventArgs e)
        {
            _HostGeoManager.Close();
            _HostMessageManager.Close();

            btnStart.IsEnabled = true;
            btnStop.IsEnabled = false;
        }

        public void ShowMessage(string message)
        {
            int threadId = Thread.CurrentThread.ManagedThreadId;

            //lblMessage.Content = message + Environment.NewLine + " (shown on thread " + threadId.ToString() + ")";

            SendOrPostCallback callback = new SendOrPostCallback(arg =>
            {
                lblMessage.Content = message + Environment.NewLine + " (marshalled from thread " + threadId + " to thread " +
                    Thread.CurrentThread.ManagedThreadId.ToString() + " | Process " + Process.GetCurrentProcess().Id.ToString() + ")";
            });

            _SyncContext.Send(callback, null);
        }

        private void btnInProc_Click(object sender, RoutedEventArgs e)
        {
            #region before
            //EndpointAddress address = new EndpointAddress("net.pipe://localhost/MessageService");
            //Binding binding = new NetNamedPipeBinding();

            //ChannelFactory<IMessageService> factory = new ChannelFactory<IMessageService>(binding, address);

            //IMessageService proxy = factory.CreateChannel();

            //proxy.ShowMessage(DateTime.Now.ToLongTimeString() + " from in-process call.");

            //factory.Close();
            #endregion

            Thread thread = new Thread(() =>
            {
                EndpointAddress address = new EndpointAddress("net.pipe://localhost/MessageService");
                Binding binding = new NetNamedPipeBinding();

                ChannelFactory<IMessageService> factory = new ChannelFactory<IMessageService>(binding, address);

                IMessageService proxy = factory.CreateChannel();

                proxy.ShowMessage(DateTime.Now.ToLongTimeString() + " from in-process call.");

                factory.Close();
            });

            thread.IsBackground = true;
            thread.Start();
        }
    }
}
