using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Windows;
using GeoLib.Client.Entities;
using GeoLib.Client.Proxies;
using GeoLib.Common.Contracts;
using GeoLib.Proxies;
using System.Threading;
using System.Threading.Tasks;

namespace GeoLib.Desktop
{
    [CallbackBehavior(UseSynchronizationContext = false)]
    public partial class MainWindow : Window, IUpdateZipCallback
    {
        public MainWindow()
        {
            InitializeComponent();

            _SyncContext = SynchronizationContext.Current;
        }

        SynchronizationContext _SyncContext = null;

        private void btnGetInfo_Click(object sender, RoutedEventArgs e)
        {
            if (txtZipCode.Text != "")
            {
                GeoClient proxy = new GeoClient();

                try
                {
                    ZipCode data = proxy.GetZipInfo(txtZipCode.Text);
                    if (data != null)
                    {
                        lblCity.Content = data.City;
                        lblState.Content = data.State.Name;
                    }

                    proxy.Close();
                }
                catch (FaultException ex)
                {
                    MessageBox.Show("Fault Exception: " + ex.Message);
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }

        private void btnGetZipCodes_Click(object sender, RoutedEventArgs e)
        {
            if (txtState.Text != null)
            {
                GeoClient proxy = new GeoClient();

                IEnumerable<ZipCode> data = proxy.GetZips(txtState.Text);
                if (data != null)
                    lstZips.ItemsSource = data;

                proxy.Close();
            }
        }

        private void btnUpdateBatch_Click(object sender, RoutedEventArgs e)
        {
            List<ZipCityData> cityZipList = new List<ZipCityData>()
            {
            	new ZipCityData() { ZipCode = "07035", City = "Bedrock" },
                new ZipCityData() { ZipCode = "33033", City = "End of the World" }
            };

            GeoAdminClient proxy = new GeoAdminClient(new InstanceContext(this));

            Task<int> task = proxy.UpdateZipCityAsync(cityZipList);

            task.ContinueWith(result =>
            {
                if (result.Exception == null)
                    MessageBox.Show(string.Format("Updated {0} items.", result.Result));
                else
                {
                    try
                    {
                        throw result.Exception.InnerException;
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error: " + ex.Message);
                    }
                }
            });
        }

        private void btnPutBack_Click(object sender, RoutedEventArgs e)
        {
            List<ZipCityData> cityZipList = new List<ZipCityData>()
            {
            	new ZipCityData() { ZipCode = "07035", City = "Lincoln Park" },
                new ZipCityData() { ZipCode = "33033", City = "Homestead" }
            };

            GeoAdminClient proxy = new GeoAdminClient(new InstanceContext(this));

            Task task = proxy.UpdateZipCityAsync(cityZipList);

            task.ContinueWith(result =>
            {
                if (result.Exception == null)
                    MessageBox.Show("Updated.");
                else
                {
                    try
                    {
                        throw result.Exception.InnerException;
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Error: " + ex.Message);
                    }
                }
            });
        }

        public void ZipUpdated(ZipCityData zipCityData)
        {
            SendOrPostCallback updateUI = new SendOrPostCallback(arg =>
            {
                lstUpdates.Items.Add(zipCityData);
            });

            _SyncContext.Send(updateUI, null);
        }
    }
}
