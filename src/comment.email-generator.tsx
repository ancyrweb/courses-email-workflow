import * as React from 'react';
import { Injectable } from '@nestjs/common';
import {
  render,
  MjmlBody,
  Mjml,
  MjmlHead,
  MjmlFont,
  MjmlPreview,
  MjmlSection,
  MjmlColumn,
  MjmlText,
} from 'mjml-react';
import { CommentDTO } from './comment.interfaces';

@Injectable()
export class CommentEmailGenerator {
  generateCommentEmail(data: CommentDTO) {
    const { html, errors } = render(
      <Mjml>
        <MjmlHead>
          <MjmlFont
            name="Lato"
            href="https://fonts.googleapis.com/css?family=Lato"
          />
          <MjmlPreview>A new comment has been added</MjmlPreview>
        </MjmlHead>

        <MjmlBody>
          <MjmlSection>
            <MjmlColumn>
              <MjmlText>{data.text}</MjmlText>
            </MjmlColumn>
          </MjmlSection>
        </MjmlBody>
      </Mjml>,

      { validationLevel: 'soft' },
    );

    return html;
  }
}
