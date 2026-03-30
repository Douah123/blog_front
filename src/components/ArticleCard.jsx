import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material'
import LikeButton from './LikeButton.jsx'
import Icon from './Icon.jsx'
import { excerpt, formatDate, navigateTo } from '../utils/app.js'

function ArticleCard({ article, showExcerpt = true, onLikeToggle, likeBusy = false, actions }) {
  const author = article.author_fullname || article.author_username || 'Auteur inconnu'

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '18px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--surface)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={4}>
          <Box flex="1" minW="0">
            <Typography
              component="button"
              type="button"
              onClick={() => navigateTo(`/articles/${article.id}`)}
              sx={{
                all: 'unset',
                cursor: 'pointer',
                display: 'block',
                fontSize: { xs: '1.2rem', md: '1.45rem' },
                fontWeight: 800,
                lineHeight: 1.2,
                color: 'var(--ink-strong)',
                transition: 'color .2s ease',
                '&:hover': { color: 'var(--accent-strong)' },
              }}
            >
              {article.title}
            </Typography>

            <Text mt={2} fontSize="sm" color="var(--ink-soft)">
              {author} | {formatDate(article.created_at)}
            </Text>
          </Box>

          <Chip
            label={article.is_public ? 'Public' : 'Priv\u00E9'}
            color={article.is_public ? 'success' : 'default'}
            variant={article.is_public ? 'filled' : 'outlined'}
            sx={{
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              '&.MuiChip-outlined': {
                borderColor: 'rgba(100, 116, 139, 0.4)',
                color: 'var(--ink-soft)',
              },
            }}
          />
        </Flex>

        <Text mt={4} fontSize="md" lineHeight="1.8" color="var(--ink-strong)">
          {showExcerpt ? excerpt(article.content) : article.content}
        </Text>

        <Divider sx={{ my: 3, borderColor: 'rgba(148, 163, 184, 0.34)' }} />

        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={3}>
          <HStack gap={4} align="center" flexWrap="wrap">
            <LikeButton
              liked={Boolean(article.liked_by_current_user)}
              count={article.likes_count ?? 0}
              busy={likeBusy}
              onToggle={onLikeToggle}
            />

            <Button
              variant="text"
              color="inherit"
              startIcon={<Icon name="comment" />}
              onClick={() => navigateTo(`/articles/${article.id}`)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'var(--ink-soft)',
                '&:hover': { backgroundColor: 'rgba(37, 99, 235, 0.1)' },
              }}
            >
              {article.comments_count ?? 0} commentaires
            </Button>
          </HStack>

          <HStack gap={2} align="center" flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<Icon name="comment" />}
              onClick={() => navigateTo(`/articles/${article.id}`)}
              sx={{
                borderRadius: '999px',
                textTransform: 'none',
                px: 2.5,
                fontWeight: 700,
                backgroundColor: 'var(--primary-button)',
                '&:hover': { backgroundColor: 'var(--primary-button-hover)' },
              }}
            >
              {article.allow_comments ? 'Commenter' : 'Voir'}
            </Button>
            {actions}
          </HStack>
        </Flex>
      </CardContent>
    </Card>
  )
}

export default ArticleCard

