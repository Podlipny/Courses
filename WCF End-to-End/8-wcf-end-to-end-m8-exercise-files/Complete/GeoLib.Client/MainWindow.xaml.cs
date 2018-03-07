using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Windows;

namespace GeoLib.Client
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnGetInfo_Click(object sender, RoutedEventArgs e)
        {
            if (txtZipCode.Text != "")
            {
                ServiceReference1.GeoServiceClient proxy = new ServiceReference1.GeoServiceClient();

                GeoLib.Client.ServiceReference1.ZipCodeData data = proxy.GetZipInfo(txtZipCode.Text);
                if (data != null)
                {
                    lblCity.Content = data.City;
                    lblState.Content = data.State;
                }

                proxy.Close();
            }
        }

        private void btnGetZipCodes_Click(object sender, RoutedEventArgs e)
        {
            if (txtState.Text != null)
            {
                EndpointAddress address = new EndpointAddress("net.tcp://localhost:8009/GeoService");
                Binding binding = new NetTcpBinding();

                ServiceReference1.GeoServiceClient proxy = new ServiceReference1.GeoServiceClient(binding, address);
                IEnumerable<GeoLib.Client.ServiceReference1.ZipCodeData> data = proxy.GetZipsByState(txtState.Text);
                if (data != null)
                    lstZips.ItemsSource = data;

                proxy.Close();
            }
        }
    }
}
