using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Contracts;
using GeoLib.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GeoLib.Tests
{
    [TestClass]
    public class ManagerTests
    {
        [TestMethod]
        public void test_zip_code_retrieval()
        {
            IGeoService geoService = new GeoManager();

            ZipCodeData data = geoService.GetZipInfo("07035");

            Assert.IsTrue(data.City.ToUpper() == "LINCOLN PARK");
            Assert.IsTrue(data.State == "NJ");
        }

        [TestMethod]
        public void test_zips_for_state()
        {
            IGeoService geoService = new GeoManager();

            IEnumerable<ZipCodeData> data = geoService.GetZips("NJ");

        }

        [TestMethod]
        public void test_zip_in_range()
        {
            IGeoService geoService = new GeoManager();

            var data = geoService.GetZips("07035", 20);

        }
    }
}
