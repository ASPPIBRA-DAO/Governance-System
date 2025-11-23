import { useState } from "react";
import { Card, Grid, IconButton, Tooltip } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const solidityCode = `/**
 *Submitted for verification at BscScan.com on 2021-08-04
*/

/**

 * Web: https://asppibra.com.br
 *
 */
pragma solidity 0.5.16;

interface IBEP20 {
  function totalSupply() external view returns (uint256);
  function decimals() external view returns (uint8);
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function getOwner() external view returns (address);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address _owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Ownable is Context {
  address private _owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor () internal {
    _owner = msg.sender;
    emit OwnershipTransferred(address(0), msg.sender);
  }

  function owner() public view returns (address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(_owner == msg.sender, "Ownable: caller is not the owner");
    _;
  }
}
`;

function Tokenomics(): JSX.Element {
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const handleCopy = () => {
    navigator.clipboard.writeText(solidityCode).then(() => {
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Copy to clipboard"), 2000);
    });
  };

  return (
    <MDBox component="section" py={6}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <MDBox>
              <MDTypography variant="h5">ASPPIBRA-DAO v 1.00</MDTypography>
              <MDTypography variant="body2" color="text">
                O Evergan v0.14 da Nexera é uma otimização de alta performance para dispositivos
                móveis, com página segura para relayers, acesso a help desk e um item avançado
                NRC-20 atualizável com o padrão ERC-20.
              </MDTypography>
            </MDBox>
            <MDBox sx={{ my: 2, borderRadius: "md", overflow: "hidden" }}>
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  backgroundColor: "grey.300",
                }}
              >
                <MDTypography variant="caption">ASPPBR.sol</MDTypography>
                <Tooltip title={tooltipText}>
                  <IconButton onClick={handleCopy} size="small">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </MDBox>
              <SyntaxHighlighter language="solidity" style={oneDark} showLineNumbers>
                {solidityCode}
              </SyntaxHighlighter>
            </MDBox>
            <MDTypography variant="overline" color="primary">
              Leia mais →
            </MDTypography>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <MDBox
            component="img"
            src="https://storage.googleapis.com/nftimagebucket/bsc/tokens/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613/TVRjMU1ETTVOakV6TWc9PV8xNzYyNzE=.svg"
            alt="NFT Image"
            width="100%"
            borderRadius="md"
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Tokenomics;
