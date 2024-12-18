import React, { FC } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
Font.register({
  family: "Noto Sans SC",
  src: `${process.env.NEXT_PUBLIC_BASE_URL}/NotoSerifSC-Regular.ttf`,
});
Font.register({
  family: "roboto",
  src: `${process.env.NEXT_PUBLIC_BASE_URL}/Roboto-Medium.ttf`,
});
Font.register({
  family: "roboto-light",
  src: `${process.env.NEXT_PUBLIC_BASE_URL}/Roboto-Light.ttf`,
});
// Create styles
const styles = StyleSheet.create({
  chinese: {
    fontFamily: "Noto Sans SC", // Font Chinese
    fontSize: 10,
  },
  page: {
    padding: 20,
    fontFamily: "roboto",
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },

  thead: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
  bold: {
    fontWeight: "bold",
  },

  image: {
    height: 40, // Atur tinggi gambar
    marginBottom: 10,
    alignSelf: "center",
  },
});
const Row: FC<{
  col1?: string;
  col2?: string;
  col3?: string;
  col4?: string;
  col5?: string;
  style?: Style;
  styleText?: Style;
  footer?: boolean;
  hideBorder?: boolean;
}> = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  style,
  styleText,
  footer,
  hideBorder,
}) => {
  return (
    <View
      style={{
        borderColor: "black",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        ...style,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRight: 1,
          flexGrow: 1,
          borderColor: "black",
          justifyContent: footer ? "flex-end" : "flex-start",
          borderBottom: 0,
          padding: 5,
        }}
      >
        {col1 && <Text style={styleText}>{col1}</Text>}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          borderRight: 1,
          borderColor: "black",
          borderTop: footer && !hideBorder ? 1 : 0,
          borderBottom: footer && !hideBorder ? 1 : 0,
        }}
      >
        {col2 && <Text style={styleText}>{col2}</Text>}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          width: 99.5,
          borderRight: 1,
          borderTop: footer && !hideBorder ? 1 : 0,
          borderBottom: footer && !hideBorder ? 1 : 0,
        }}
      >
        {col3 && <Text style={styleText}>{col3}</Text>}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 100.5,
          borderRight: 1,
          borderColor: "black",
          borderTop: footer && !hideBorder ? 1 : 0,
          borderBottom: footer && !hideBorder ? 1 : 0,
        }}
      >
        {col4 && <Text style={styleText}>{col4}</Text>}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "black",
          width: 100,
          borderTop: footer && !hideBorder ? 1 : 0,
          borderBottom: footer && !hideBorder ? 1 : 0,
        }}
      >
        {col5 && <Text style={styleText}>{col5}</Text>}
      </View>
    </View>
  );
};
// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{ ...styles.image, marginRight: 10, marginLeft: 10 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/julong.png`}
        />
        <View style={styles.section}>
          <Text style={styles.title}>JULONG GROUP (INDONESIA)</Text>
          <Text style={{ textAlign: "center", fontFamily: "Noto Sans SC" }}>
            聚龙集团印尼区
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 10,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: 1,
              borderColor: "black",
            }}
          >
            <View>
              <View style={styles.section}>
                <Text
                  style={{
                    ...styles.title,
                    textDecoration: "underline",
                    marginBottom: 10,
                  }}
                >
                  STAFF REQUIREMENT
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 10, padding: 5 }}>
              <View
                style={{
                  ...styles.section,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    width: 100,
                  }}
                >
                  OPERATING UNIT
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  :
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingVertical: 1,
                  }}
                >
                  JULONG GROUP
                </Text>
              </View>

              <View
                style={{
                  ...styles.section,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    width: 100,
                  }}
                >
                  BUDGET YEAR
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  :
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    paddingVertical: 1,
                  }}
                >
                  2024/2025
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottom: 1,
                borderTop: 1,
                borderColor: "black",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 5,
                  borderRight: 1,
                  flexGrow: 1,
                  borderColor: "black",
                }}
              >
                <Text style={styles.thead}>Grade</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRight: 1,
                  borderColor: "black",
                  width: 100,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Text style={styles.thead}>Existing</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                    width: "100%",
                    borderTop: 1,
                    borderColor: "black",
                  }}
                >
                  <Text style={styles.thead}>Aug-24</Text>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRight: 1,
                  borderColor: "black",
                  width: 200,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Text style={styles.thead}>2025 BUDGET (Sep24-Aug25)</Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: 200,
                    borderTop: 1,
                    borderColor: "black",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 5,
                      borderRight: 1,
                      width: 100,
                      borderColor: "black",
                    }}
                  >
                    <Text style={styles.thead}>Promote</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 100,
                      borderColor: "black",
                    }}
                  >
                    <Text style={styles.thead}>Recruit</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderColor: "black",
                  width: 100,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <Text style={styles.thead}>TOTAL</Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.thead}>2024/2025</Text>
                </View>
              </View>
            </View>
            {/* ROW */}
            <Row col1=" " />
            <Row
              col1="Executives"
              styleText={{ textDecoration: "underline" }}
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 7"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 6"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 5"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 4"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              footer={true}
              col1="Sub - Total ="
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              col1="Non - Executives"
              styleText={{ textDecoration: "underline" }}
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 3"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 2"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />{" "}
            <Row
              styleText={{
                fontWeight: "light",
                fontFamily: "roboto-light",
              }}
              col1="Gol. 1"
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              footer={true}
              col1="Sub - Total ="
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
            <Row
              hideBorder={true}
              footer={true}
              col1="TOTAL ="
              col2="1"
              col3="2"
              col4="2"
              col5="2"
            />
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
