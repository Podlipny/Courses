using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using GeoLib.Contracts;
using GeoLib.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GeoLib.Tests
{
    [TestClass]
    public class ServiceTests
    {
        [TestMethod]
        public void test_zip_code_retrieval()
        {
            string address = "net.pipe://localhost/GeoService";
            Binding binding = new NetNamedPipeBinding();

            ServiceHost host = new ServiceHost(typeof(GeoManager));

            host.AddServiceEndpoint(typeof(IGeoService), binding, address);

            host.Open();

            ChannelFactory<IGeoService> factory = new ChannelFactory<IGeoService>(binding, new EndpointAddress(address));
            IGeoService proxy = factory.CreateChannel();

            ZipCodeData data = proxy.GetZipInfo("07035");

            Assert.IsTrue(data.City.ToUpper() == "LINCOLN PARK");
            Assert.IsTrue(data.State == "NJ");
        }
    }
}
