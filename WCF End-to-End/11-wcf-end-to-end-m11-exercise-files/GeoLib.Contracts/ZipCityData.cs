using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace GeoLib.Contracts
{
    [DataContract]
    public class ZipCityData
    {
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string ZipCode { get; set; }
    }
}
