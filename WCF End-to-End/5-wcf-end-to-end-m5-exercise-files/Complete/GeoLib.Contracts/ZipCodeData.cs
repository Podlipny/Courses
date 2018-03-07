using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

namespace GeoLib.Contracts
{
    [DataContract(Namespace = "http://www.pluralsight.com/MiguelCastro/WcfEndToEnd")]
    public class ZipCodeData
    {
        [DataMember]
        public string City { get; set; }
        [DataMember]
        public string State { get; set; }
        [DataMember]
        public string ZipCode { get; set; }
    }
}