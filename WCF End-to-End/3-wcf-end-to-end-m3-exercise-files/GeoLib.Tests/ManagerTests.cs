using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GeoLib.Services;
using GeoLib.Contracts;
using System.Collections.Generic;
using System.Linq;
using Moq;
using GeoLib.Data;

namespace GeoLib.Tests
{
    [TestClass]
    public class ManagerTests
    {
        [TestMethod]
        public void test_zip_code_retrieval()
        {
            // nadefinujeme si mock
            Mock<IZipCodeRepository> mockZipCodeRepository = new Mock<IZipCodeRepository>();

            // udelame mock object
            ZipCode zipCode = new ZipCode()
            {
                City = "LINCOLN PARK",
                State = new State() { Abbreviation = "NJ" },
                Zip = "07035"
            };

            // pokud mock dostane request na GetByZip("07035"), tak vratime nas zipCode entity]
            // testujeme kod uvnitr service a ne uvnitr repository
            mockZipCodeRepository.Setup(obj => obj.GetByZip("07035")).Returns(zipCode);

            IGeoService geoService = new GeoManager(mockZipCodeRepository.Object);

            ZipCodeData data = geoService.GetZipInfo("07035");

            Assert.IsTrue(data.City.ToUpper() == "LINCOLN PARK");
            Assert.IsTrue(data.State == "NJ");
        }
    }
}
