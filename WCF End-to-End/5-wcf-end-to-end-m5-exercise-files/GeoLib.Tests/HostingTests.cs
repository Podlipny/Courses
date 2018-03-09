using System;
using System.ServiceModel;
using GeoLib.Contracts;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GeoLib.Tests
{
    [TestClass]
    public class HostingTests
    {
        [TestMethod]
        public void test_geo_manager_as_service_tcp()
        {
            ChannelFactory<IGeoService> channelFactory =
                new ChannelFactory<IGeoService>("tcp");

            IGeoService proxy = channelFactory.CreateChannel();

            (proxy as ICommunicationObject).Open();

            channelFactory.Close();
        }

        [TestMethod]
        public void test_geo_manager_as_service_http()
        {
            ChannelFactory<IGeoService> channelFactory =
                new ChannelFactory<IGeoService>("http");

            IGeoService proxy = channelFactory.CreateChannel();

            (proxy as ICommunicationObject).Open();

            channelFactory.Close();
        }
    }
}
