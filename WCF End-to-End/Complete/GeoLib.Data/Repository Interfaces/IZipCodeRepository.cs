using System;
using System.Collections.Generic;
using System.Linq;
using GeoLib.Business.Entities;
using GeoLib.Core;

namespace GeoLib.Data
{
    public interface IZipCodeRepository : IDataRepository<ZipCode>
    {
        ZipCode GetByZip(string zip);
        IEnumerable<ZipCode> GetByState(string state);
        IEnumerable<ZipCode> GetZipsForRange(ZipCode zip, int range);
        void UpdateCityBatch(Dictionary<string, string> cityBatch);
    }
}
