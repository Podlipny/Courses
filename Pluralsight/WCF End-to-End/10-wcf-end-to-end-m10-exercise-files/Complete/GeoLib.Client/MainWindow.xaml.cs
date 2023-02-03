using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Windows;
using GeoLib.Proxies;
using GeoLib.Contracts;

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
                GeoClient proxy = new GeoClient();

                try
                {
                    ZipCodeData data = proxy.GetZipInfo(txtZipCode.Text);
                    if (data != null)
                    {
                        lblCity.Content = data.City;
                        lblState.Content = data.State;
                    }

                    proxy.Close();
                }
                catch (FaultException<ExceptionDetail> ex)
                {
                    MessageBox.Show("Exception thrown by service.\n\rException type: " +
                        "FaultException<ExceptionDetail>\n\r" +
                        "Message: " + ex.Detail.Message + "\n\r" +
                        "Proxy state: " + proxy.State.ToString());
                }
                catch (FaultException<ApplicationException> ex)
                {
                    MessageBox.Show("Exception thrown by service.\n\rException type: " +
                        "FaultException<ApplicationException>\n\r" +
                        "Reason: " + ex.Message + "\n\r" +
                        "Message: " + ex.Detail.Message + "\n\r" +
                        "Proxy state: " + proxy.State.ToString());
                }
                catch (FaultException<NotFoundData> ex)
                {
                    MessageBox.Show("Exception thrown by service.\n\rException type: " +
                        "FaultException<NotFoundData>\n\r" +
                        "Message: " + ex.Message + "\n\r" +
                        "Proxy state: " + proxy.State.ToString());
                }
                catch (FaultException ex)
                {
                    MessageBox.Show("Exception thrown by service.\n\rException type: " +
                        ex.GetType().Name + "\n\r" +
                        "Message: " + ex.Message + " \n\r" +
                        "Proxy state: " + proxy.State.ToString());
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Exception thrown by service.\n\rException type: " + 
                        ex.GetType().Name + "\n\r" +
                        "Message: " + ex.Message + "\n\r" +
                        "Proxy state: " + proxy.State.ToString());
                }
            }
        }

        private void btnGetZipCodes_Click(object sender, RoutedEventArgs e)
        {
            if (txtState.Text != null)
            {
                GeoClient proxy = new GeoClient();

                IEnumerable<ZipCodeData> data = proxy.GetZips(txtState.Text);
                if (data != null)
                    lstZips.ItemsSource = data;

                proxy.Close();
            }
        }
    }
}
